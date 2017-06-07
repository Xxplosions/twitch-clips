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
        var clipPlaceholder = $('.clip-placeholder');
        if(fiveSecondsAgo) {
            var embed = clip.embed_html;
            clipPlaceholder.hide();
            clipPlaceholder.append(embed);
            var duration = clip.duration;
            var fadeInDuration = 3300;
            clipPlaceholder.delay(fadeInDuration).fadeIn(1000);
            clipPlaceholder.delay(duration*1000 - (fadeInDuration + 100)).hide(0);
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