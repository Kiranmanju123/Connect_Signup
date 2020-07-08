
		$(document).ready(function() {
			 const ip="https://test.1ounce.in/";

              //FETCH THE PROFESSION LIST FROM PROFESSION API 
			 fetch(`${ip}connect/professionapi/`) 
				.then(function(res){
				return res.json()
				})
				.then(function(data){
					console.log(data)
					result(data)
				})
				.catch(function(err){
					console.log("Something Wrong With the api Call"+err)
				})
				function result(data){
					let options="";
					professions = data;
					for(let i=0;i<professions.results.length;i++){
					options += `<option value="${professions.results[i].id}">${professions.results[i].title}</option>`

				}
				    document.getElementById("profession").innerHTML = options;
				}


               //FETCH THE AREA STATE FROM THE PINCODE API
			   $("#pincode").on("input", function() {   
			   let inp= $("#pincode").val()
			   if(inp.length==6) {
				$('#animation').addClass('spinner-border text-warning');
				fetch(`${ip}common/pincode/${inp}/`)
				.then(function(res){
					$('#animation').removeClass('spinner-border text-warning');
				 return res.json()
				})
				.then(function(data){
					
				console.log(data)
				let options="";
				areas = data;
				for(let i=0;i<areas.results.length;i++){
				options += `<option value="${areas.results[i].id}">${areas.results[i].area}</option>`
			   
				}
			   document.getElementById("area").innerHTML = options;
			   document.getElementById("state").value = `${areas.results[0].state}`;
			   document.getElementById("district").value = `${areas.results[0].district}`;
			
				})
				.catch(function(err){
					alert("Please Enter Valid Pin Code")
				})
			} 
			})

            //OTP FIELDS WILL HIDEN FIRST 
			$("#otp_field").hide()
		    $("#send_otp").click(function(){
			$("#otp_field").show()
		    })

            //ENABLES OTP BUTTON WHEN INPUT IS 10
		    document.getElementById("send_otp").disabled = true;
		    $("#phn").on("input", function() {
			let inp= $("#phn").val()
			if(inp.length==10){
				document.getElementById("send_otp").disabled = false;
				$("#send_otp").css("background-color", "red");
			} else {
				document.getElementById("send_otp").disabled = true;
			}

		   })


            //DISABLES RESEND OTP AND ENABLES AFTER 60SEC
		    $("#send_otp").click(function() {
					$("#send_otp").hide()
					$("#resendotp_field").hide()
					var seconds = 30;
	                var countdown = setInterval(function() {
	                seconds--;
	                document.getElementById("countdown").textContent = seconds;
	                if (seconds <= 0) {
						clearInterval(countdown);
						$("#resendotp_field").show()
				        //$("#un").hide()

						}
	             }, 1000);

					
				})
            
            //DISABLES THE SUBMITTING FORM BY ENTER KEY
		    $(window).keydown(function(event){
		    if(event.keyCode == 13) {
		    event.preventDefault();
		    return false;
		    }
	         });

            //FOCUS TO NEXT OTP INPUT FIELD
		    
	           // $(".j").on("keypress", function(e){
            //       $(this).next().trigger("focus");
	       

           //SHOWS THE PASSWORD INPUT FIELD VALUE 
           $(document).on('click', '.toggle-password', function() {
           $(this).toggleClass("fa-eye fa-eye-slash");
           var input = $("#pass2,#pass1");
           input.attr('type') === 'password' ? input.attr('type','text') : input.attr('type','password')
           });

            //CHECKS IF ALL FIELDS ARE FILLED
	        document.getElementById("proceed2").disabled = true;
			$("#username,#email,#company_name,#pincode,#address").on("input", function() {
		    var name = $("#username").val().length;
			var email = $("#email").val().length;
			var company_name = $("#company_name").val().length;
			var pincode = $("#pincode").val().length;
			var address = $("#address").val().length;
			// var pass1 = $("#pass1").val().length;
			// var pass2 = $("#pass2").val().length;
	        
		
			if(name<=0 || email<=0 || company_name<=0 || pincode<=0 ||address<=0){
				document.getElementById("proceed2").disabled = true;
			 } else{
				document.getElementById("proceed2").disabled = false;
			 }
			})

			$("#invalid_details").hide()

            //PRESS ENTER TO BUTTON CLICK FUNCTIONALITY
			$("#user_password").keyup(function(event) {
			  if (event.keyCode === 13) {
			     $("#login_check").click();
			    }
			});

			$("#phn").keyup(function(event) {
			    if (event.keyCode === 13) {
			        $("#check_mobile_no").click();
			    }
			});

			

           
            //IF COMPANY NAME IS NEEDED ENABLE THE COMPANY NAME FIELD
			$('#company_name').on('change',function(){
			    if($(this).val()==="0"){
			    $("#show_company_input").show()
			    }
			    else{
			    $("#show_company_input").hide()
			    }
			});

			$("#user_password").focusin(function() {
				$("#invalid_details").hide()
			})
			$("#phn").focusin(function() {
				$("#check_valid_no").hide()
			})

            
            //CHECKS BY NUMBER IF USER REGISTERED OR NOT 
			$("#check_mobile_no").on("click", function() {
			
			let inp = document.getElementById("phn").value;
			if(inp.length==10){
				$('#load_icon').addClass('spinner-border text-warning');
				$("#check_mobile_no").hide()
			   
				$.post(`${ip}connect/checkPhone/`, { phone:inp } ,function(data){
					$('#load_icon').removeClass('spinner-border text-warning');
				let res = data
				if(res.code==2) {
					$("#send_otp").css("display","inline")
				} else {
					$("#send_otp").hide()
				}

				if(res.code==3){
					$("#reguser").show()

				} else {
					$("#reguser").hide()
				}
				
				
        });
			} else {
				$("#check_valid_no").css("display","block")
			}
		})

	

		})
		

