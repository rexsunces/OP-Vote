var nowUserId = "123";

$(function () {
    window.mySwipe = new Swipe(document.getElementById('slider'), {
        startSlide: 0,
        auto: false,
        continuous: true,
        callback: function (index, elem) {
            var i = bullets.length;
            while (i--) {
                bullets[i].className = 'off';
            }
            bullets[index].className = 'on';
        },
        transitionEnd: function (index, elem) {

        }
    });
    var bullets = document.getElementById('position').getElementsByTagName('li');
    var i = bullets.length;
    while (i--) {
        bullets[i].className = 'off';
    }
    bullets[0].className = 'on';
    var $j = jQuery.noConflict();
    GetAndSetTotalImages();

    $('.per-image').each(function () {
        $(this).singleTap(function () {
            $j('#myModal').modal("show");
            $j('#modal-img').attr("src", $(this).attr("full-size-data"));
        })
    })
    $(".per-vote-btn").each(function () {
        $(this).on('click',function () {
           // 更新投票
          // UpdateVotes($(this).attr("user-data"));
        })
    })
})


//获取当前用户的微信Id
function GetNowUserId() {
    //nowUserId=xxx;
}

//更新投票
function UpdateVotes(userId) {
    
    var submitData = {
        "userId": userId,//图片上的人的userId
        "nowUserId":nowUserId//当前微信使用者的userId
    };
    $.ajax({
        type: "post",
       // url: "/api/game/play",
        data: JSON.stringify(submitData),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.success == true) {
                alert("投票成功！");
                //返回此刻该候选人的票数，并设置
                //$("#votes-" + submitData.userId).text(xxx);
            } else {
                alert("每天只能投3票哦！");//此处true和false没有覆盖所有情况
            }
        }, 
        error: function (e) {
            alert($.parseJSON(e.responseText));
        }
    });
}

//获取20个人的信息
function GetAndSetTotalImages() {
    //$.get("/index.php?r=game/getmygamespoint", { "userid": userId }, function (data, textStatus) {
    var data = {
        success: true, data: [
        { userId: "0", userName: "佟丽娅", imgSrc: "img/tly.jpg", currentVotes: 1234 },
        { userId: "1", userName: "李若彤", imgSrc: "img/lrt.jpg", currentVotes: 2222 },
        { userId: "2", userName: "陈红", imgSrc: "img/ch.jpg", currentVotes: 3333 },
        { userId: "3", userName: "苍老师", imgSrc: "img/cjk.jpg", currentVotes: 1111 },
        { userId: "4", userName: "佟丽娅", imgSrc: "img/tly.jpg", currentVotes: 1234 },
        { userId: "5", userName: "doge", imgSrc: "img/3.jpg", currentVotes: 99 },
        { userId: "6", userName: "佟丽娅", imgSrc: "img/tly.jpg", currentVotes: 1234 },
        { userId: "7", userName: "佟丽娅", imgSrc: "img/tly.jpg", currentVotes: 1234 },
        { userId: "8", userName: "佟丽娅", imgSrc: "img/tly.jpg", currentVotes: 99 },
        { userId: "9", userName: "doge2", imgSrc: "img/3.jpg", currentVotes: 1234 },
        { userId: "10", userName: "doge3", imgSrc: "img/3.jpg", currentVotes: 99 },
        { userId: "11", userName: "佟丽娅", imgSrc: "img/tly.jpg", currentVotes: 1234 },
        { userId: "12", userName: "美女", imgSrc: "img/mn1.jpg", currentVotes: 99 },
        { userId: "13", userName: "佟丽娅", imgSrc: "img/tly.jpg", currentVotes: 1234 },
        { userId: "14", userName: "doge4", imgSrc: "img/3.jpg", currentVotes: 99 },
        { userId: "15", userName: "佟丽娅", imgSrc: "img/tly.jpg", currentVotes: 1234 },
        { userId: "16", userName: "陈红", imgSrc: "img/ch.jpg", currentVotes: 99 },
        { userId: "17", userName: "佟丽娅", imgSrc: "img/tly.jpg", currentVotes: 1234 },
        { userId: "18", userName: "doge5", imgSrc: "img/3.jpg", currentVotes: 99 },
        { userId: "19", userName: "苍老师", imgSrc: "img/cjk.jpg", currentVotes: 1234 }]
    }
        if (data.success == true) {
            for (var i = 0; i < data.data.length; i++) {
                var str = "<div class='per-image-div'><div full-size-data='" + data.data[i].imgSrc + "' class='per-image'><img src= '" + data.data[i].imgSrc + "' />" +
                                                               "</div>" +
                                                               "<div class='per-vote-info'>" +
                                                                    "<div class='name'>姓名</div>" +
                                                                    "<div class='name-text'>" + data.data[i].userName + "</div>" +
                                                                    "<div class='nums'>票数</div>" +
                                                                    "<div id='votes-" + data.data[i].userId + "' class='nums-text'>" + data.data[i].currentVotes + "</div>" +
                                                                "</div>" +
                                                                "<img user-data='" + data.data[i].userId + "' class='per-vote-btn' src='img/vote-btn.png' />" +
                                    "</div>";
                console.log(parseInt(i / 4));
                switch (parseInt(i / 4)) {
                    case 0: 
                        $(".image-0").append($(str));
                        break;
                    case 1:
                        $(".image-1").append($(str));
                       break;
                    case 2:
                        $(".image-2").append($(str));
                        break;
                    case 3:
                        $(".image-3").append($(str));
                      break;
                    case 4:
                        $(".image-4").append($(str));
                       break;
                    default:
                       break;
                 
                }
            }
        }
        else {
            alert("数据获取失败！");
        }
    //})
}