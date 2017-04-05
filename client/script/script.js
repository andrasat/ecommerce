
window.fbAsyncInit = function() {
  FB.init({
    appId      : '1272249479519191',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.8'
  });
  FB.getLoginStatus(statusChangeCallback, true)
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(res) {
  console.log('status')
  console.log(res)

  if(res.status == 'connected') {
    testAPI()
  } else {
    console.log('please login')
  }
}

function testAPI() {
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
  });
}

let FBlogin = new Vue({
  el: '#sign-in',
  data : {
    message : ''
  },
  methods : {
    login : function() {
      FB.login(function(res){
        console.log(res.status)
        if(res.status == 'connected') {
          FB.api('/me', function(response) {
            axios
              .post('http://localhost:3000/cust/login', {
              id : response.id,
              name : response.name
            })
              .then(function(res) {
                console.log(res.data)
                localStorage.setItem('token', res.data)
                window.location.reload()
              })
              .catch(function() {
                alert('Server refused to connect')
              })
          })
        } else {
          console.log('Login error')
        }
      }, {scope: 'public_profile'});
    },
    checkLogin : function() {
      if(localStorage.token) {
        this.message = 'You are logged in'
        return false
      } else {
        this.message = 'Login with Facebook'
        return true
      }
    }
  },
  mounted : function() {
    this.checkLogin()
  }
})

let FBlogout = new Vue({
  el: '#sign-out',
  data : {
    message : 'Logout'
  },
  computed : {
    classObject : function() {
      return {
        'nav-item': true,
        'is-hidden': FBlogin.checkLogin()
      }
    }
  },
  methods : {
    logout : function() {
      console.log('clicked')
      FB.logout(function() {
        localStorage.removeItem('token')
        window.location.reload()
      })
    }
  }
})

let navMenu = new Vue({
  el: '#nav',
  data : {
    isActive : false
  },
  computed : {
    classObject : function() {
      return {
        'nav-right' : true,
        'nav-menu' : true,
        'is-active' : this.isActive
      }
    }
  },
  methods : {
    resize : function() {
      console.log(window.innerWidth)
      if($(window).width() < 750) {
        this.isActive = true
      } else {
        this.isActive = false
      }
    }
  }
})

navMenu.resize()
$(window).resize(navMenu.resize)