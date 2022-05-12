const ytdl = require("ytdl-core");

const strings = require("../strings.json");
const utils = require("../utils");


module.exports.run = async (client, message, args) => {

    if(!args[0]) return message.channel.send(strings.noArgsSongSearch);

    utils.log("Đang tìm kiếm thông tin chi tiết về bài hát...")

    if(utils.isURL(args[0])){
        FUrl = args[0];
    } else {
        FUrl = await utils.getUrl(args)
    };

    let voiceChannel = message.member.voice.channel; 
    const serverQueue = queue.get("queue");
    const songInfo = await ytdl.getBasicInfo(FUrl);

    const song = {
        title: songInfo.videoDetails.title,
        duration: songInfo.videoDetails.lengthSeconds,
        url: FUrl,
        requestedby: message.author.tag
    };

    utils.log("Có thông tin chi tiết về bài hát, đang chuẩn bị phát nhạc ...")

    if(!serverQueue) {

        const queueConstruct = {
            textchannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 4,
            playing: true,
            loop: false,
            skipped: false
        };

        queue.set("queue", queueConstruct);
        queueConstruct.songs.push(song);

        if (voiceChannel != null) { 

            message.channel.send(strings.startedPlaying.replace("SONG_TITLE", song.title).replace("url", song.url));

            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;

            utils.play(queueConstruct.songs[0]);

        } else {
            queue.delete("queue");
            return message.channel.send(strings.notInVocal);
        };
    } else {

        serverQueue.songs.push(song);
        utils.log(`Thêm thành công bài hát vào hàng đợi : ${song.title}`)

        return message.channel.send(strings.songAddedToQueue.replace("SONG_TITLE", song.title).replace("url", song.url));
    };

};

module.exports.names = {
    list: ["play", "p"]
};