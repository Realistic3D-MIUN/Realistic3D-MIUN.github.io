  console.log("Loaded");
  $(document).ready(function() {
    $('#button_mono').on('click',()=>{
        console.log("Button Clicked");
        var currentUrl = window.location.href;
        console.log(currentUrl);
        currentUrl = currentUrl.replace("VISTA_Q_ToolKit.html","")
        var newUrl = currentUrl + "mono.html"
        window.location.href = newUrl;
    });
    $('#button_mono360').on('click',()=>{
        var currentUrl = window.location.href;
        console.log(currentUrl);
        currentUrl = currentUrl.replace("VISTA_Q_ToolKit.html","")
        var newUrl = currentUrl + "mono_360.html"
        window.location.href = newUrl;
    });
    $('#button_mono_video').on('click',()=>{
        var currentUrl = window.location.href;
        console.log(currentUrl);
        currentUrl = currentUrl.replace("VISTA_Q_ToolKit.html","")
        var newUrl = currentUrl + "mono_video.html"
        window.location.href = newUrl;
    });
    $('#button_mono_360_video').on('click',()=>{
        var currentUrl = window.location.href;
        console.log(currentUrl);
        currentUrl = currentUrl.replace("VISTA_Q_ToolKit.html","")
        var newUrl = currentUrl + "mono_360_video.html"
        window.location.href = newUrl;
    });
    $('#button_stereo').on('click',()=>{
        var currentUrl = window.location.href;
        console.log(currentUrl);
        currentUrl = currentUrl.replace("VISTA_Q_ToolKit.html","")
        var newUrl = currentUrl + "stereo.html"
        window.location.href = newUrl;
    });
    $('#button_stereo_video').on('click',()=>{
        var currentUrl = window.location.href;
        console.log(currentUrl);
        currentUrl = currentUrl.replace("VISTA_Q_ToolKit.html","")
        var newUrl = currentUrl + "stereo_video.html"
        window.location.href = newUrl;
    });
    $('#button_lightfield').on('click',()=>{
        var currentUrl = window.location.href;
        console.log(currentUrl);
        currentUrl = currentUrl.replace("VISTA_Q_ToolKit.html","")
        var newUrl = currentUrl + "lightfield.html"
        window.location.href = newUrl;
    });
    $('#button_lightfield_refocus').on('click',()=>{
        var currentUrl = window.location.href;
        console.log(currentUrl);
        currentUrl = currentUrl.replace("VISTA_Q_ToolKit.html","")
        var newUrl = currentUrl + "lightfield_focus.html"
        window.location.href = newUrl;
    });
});