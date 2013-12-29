// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file
//
// WARNING: THE FIRST BLANK LIsNE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
  //= require_tree .

var vague = $(".container").Vague({intensity:4});
vague.blur();
var vague1 = $(".container1").Vague({intensity:4});
vague1.blur();
var vague2=$(".container2").Vague({intensity:4});
vague2.blur();

//$(".btn").on("click",$.proxy(vague.toggleblur,vague));

var jsonvar = [];



/**** Facebook JS Functions ****************/

// Additional JS functions here
window.fbAsyncInit = function() {
  FB.init({
      appId      : '656426487730660', // App ID
      channelUrl : 'http://dwarak.t.proxylocal.com', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

//alert('page 1');


FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
    if (location.pathname == "/") {
      facebook_login();
      
    }
  } else {  
    if (location.pathname != "/") {
    window.location.href='/';
  }
  }
});


};

 // Load the SDK asynchronously
 (function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
 }(document));

 



 /**** Facebook JS Functions ENDS ****************/

 function facebook_login() {


    //$("#sai").hide();

    FB.login(function(response) {
      localStorage.clear();
    if (response.authResponse) {
        var uid = response.authResponse.userID;
        localStorage.access_token = response.authResponse.accessToken;
        //alert('login success');
        //alert(access_token);
        
       
        get_my_data(localStorage.access_token);
        

    } else {
      bootbox.alert("Not Logged In", function() {
    // any code you want to happen after the alert is dismissed
    location.reload();
});
        //bootbox.alert('');
        
    }
}, {
            scope : 'publish_stream'
    });
}




//   $(document).ready(function() {
//   $('.example-countries .typeahead').typeahead({
//     name: 'countries',
//     local: ["Harini","Jason"],
//     header: '<h3 class="league-name">NBA Teams</h3>',
//   });  
// })


//   $(document).ready(function() {
//   $('.example-countries .typeahead').typeahead({                              
//   name: 'jsonvar_string',                                                        
//   local: jsonvar_string,
//   header: '<h3 class="league-name">Choose Country</h3>',                                                       
// }); 
// });

  $(document).ready(function() {
    //$('body').hide().fadeIn(600);
     //$("#pic").hide().fadeIn();
     $('#landing').css("visibility","visible").hide().fadeIn(1000);
     $('#result').css("visibility","visible").hide().fadeIn(1000);
    $("#letter-container").lettering().hide().fadeIn(2500);
    $("#fb-login-button").hide().fadeIn(5000);

  $('.example-countries .typeahead').typeahead({
    name: 'countries',
    local: JSON.parse("["+localStorage.finalstring.substring(1,localStorage.finalstring.length-1)+"]"),
    limit:10
  }); 
})

// function make_the_call() {
//   $('#field1').typeahead({source: jsonvar_string});
//   $('#field2').typeahead({source: jsonvar_string});
// }

 function get_friends_data(access_token){
         $.getJSON("https://graph.facebook.com/me/friends?access_token=" + access_token, function(result) {
            //alert('getting friends data');
            var friends_list = result;
            var friends_list_length = Object.keys(friends_list.data).length;
            
            for (var i = 0; i < friends_list_length; i++) {
                jsonvar.push(friends_list.data[i].name);
            }
            localStorage.finalstring = JSON.stringify(jsonvar);
            window.location.href = "/login/landing";
        });
       }

function get_my_data(access_token){
   $.getJSON("https://graph.facebook.com/me?access_token=" + access_token, function(result) {
            //alert('access my data');
            var myself = result;
            localStorage.myname=myself.name;
            //alert('my name = '+ myself.name);
            jsonvar.push(myself.name);
            get_friends_data(access_token);
            // localStorage.finalstring = JSON.stringify(jsonvar);
        });
}


function name_submit() {
  document.getElementById("fb_names").submit();
}

function leave_landing(){

  event.preventDefault();

  if ((!document.getElementById("name1").value)||(!document.getElementById("name2").value)||(!document.getElementById("name3").value))
  {
    bootbox.alert('Please fill in all the names!');
  }
  else if ((document.getElementById("name1").value==document.getElementById("name2").value)||(document.getElementById("name3").value==document.getElementById("name2").value)||(document.getElementById("name1").value==document.getElementById("name3").value))
  {
    bootbox.alert('There cannot be same names in two fields. Put unique names please.');
  }
  else
  {  
  $('#form-fill').fadeOut(1000);
  document.getElementById('fb_names').submit();
  }
}

function post_to_facebook(){

  
  

  //event.preventDefault();


  //var pass_string='?profile=http://dwarak.t.proxylocal.com&access_token='+localStorage.access_token;
  //alert(localStorage.access_token);
  //alert(pass_string);


  FB.ui(
  {
    method: 'feed',
    name: localStorage.myname +' has compared his Facebook friends',
    link: 'http://www.dwarak.in',
    picture: 'http://data2.whicdn.com/images/38083760/152_vector-couple-kissing-l_thumb.jpg',
    caption: 'Match Pairs and Make peers',
    description: $("#comment_body").val(),
  },
  function(response) {
    if (response && response.post_id) {
      bootbox.alert('Awesome! Post was just published.',function() {
        window.location.href="/login/landing";
      });
    } else {
      bootbox.alert('Post was not published.');
    }
  }
);


/**** Creating Object ******/

// FB.api(
//   'me/objects/profile',
//   'post',
//   {
//     app_id: 656426487730660,
//     type: "profile",
//     url: "http://dwarak.t.proxylocal.com",
//     title: "a pair",
//     image: "https://s-static.ak.fbcdn.net/images/devsite/attachment_blank.png",
//     description: ""
//   },
//   function(response) {
//     // handle the response
//     if (response && response.post_id) {
//       alert('Dude! Object Created.');
//     } else {
//       alert("Response error : " + response.error.message);
//       alert('Object not created.');
//     }
//   }
// );

/******** End: Object Creation *************/


//create_story();

//window.location.href = "/login/result";

} 

function create_story(){


/****** Action *****************/


  FB.api(
  'me/compair_dtsdwarak:compare',
  'post',
  {
    profile: "http://dwarak.t.proxylocal.com"
  },
  function(response) {
    // handle the response
    if (response && response.post_id) {
      alert('Yay!! :) Post got published.');
    } else {
      alert("Response error : " + response.error.message);
      alert('Post was not published.');
    }
  }
);

/******* End: Action **************/


}

function result_page(){
  circle_show();
  comment_show();

}

function circle_show() {
  $("#outer-circle").css("visibility","visible").hide().fadeIn(5000).delay(1000).fadeOut(2000);
}

function comment_show(){
  $("#comment_body").css("visibility","visible").hide().fadeIn(3000);
}

function fb_logout(){

  bootbox.alert("You're being logged out.", function() {
    // any code you want to happen after the alert is dismissed
    FB.logout(function(response) {
        if (response.status === 'connected'){
          bootbox.alert('Error logging out. Try Facebook Login Page');
          
        }
        else{
          window.location.href="/";
        }
                    
                });
});


  

  
}

function options(){
  bootbox.dialog("So, what else do you wanna do?", [{
                    "label" : "Try another Match!",
                    "class" : "btn-primary",
                    "callback": function() {  
                        window.location.href="/login/landing";
                    }
                },{
                    "label" : "I'm logging out",
                    "class" : "btn-danger",
                    "callback": function() {
                        fb_logout();
                    }
                }]);
}