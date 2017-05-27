/**
 * Created by elias on 5/27/17.
 */
$.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/clips/top?channel=xxplosions&limit=1',
    headers: {
        'Client-ID': '20aijit7xodpo8qumioq6e8vs5j6m3',
        'Accept': 'application/vnd.twitchtv.v5+json'
    },
    success: function(data) {
        console.log(data);
        var clip = data.clips[0];
        var createdTime = new Date(clip.created_at);
        console.log(createdTime);

        var fiveSecondsAgo = timeDifference(createdTime);
        if(fiveSecondsAgo) {
            var embed = clip.embed_html;
            $('.clip-placeholder').append(embed);
            $('.clip-placeholder iframe').attr("id", "twitch-iframe");

            $("#twitch-iframe").on('load', function(){
                console.log($("#twitch-iframe").contents())
            })
        }
    }
});


function timeDifference(previous) {
    var current = new Date();
    var msPerMinute = 60 * 1000;
    var elapsed = current - previous;
    if (elapsed > msPerMinute) {
        if (Math.round(elapsed/1000) > 5) {
            return true;
        }
    }
    return false
}