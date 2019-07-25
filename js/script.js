/* ===================================== 
   Public API Request
======================================== */
$(document).ready(function () { //sets up the document
    let employeeRolodex = [];
    let gallery = $("#gallery");
    let currentIndex = 0;


    $.ajax({ //populates random users to display
        url: 'https://randomuser.me/api/?results=12&nat=us,gb,nz,fi,gb,au,ie',
        dataType: 'json',
        success: function (data) {
            employeeRolodex = data.results;
            // console.log(data);
            createSearch();
            createEmployeeRolodex();
            createModalCardPopup();
            createModalBtnContainer();

            $(".card").on("click", function () { //allows for the modal to appear on the screen after its clicked on.
                let myIndex = $(this).attr("index");
                currentIndex = myIndex;
                populateModalCardPopup(currentIndex);
                $(".modal-container").show();
            });

            $("#modal-close-btn").on("click", function () { // the ability to close the modal window
                $(".modal-container").hide();
            });

            $("#search-submit").on("click", function () { //allows the user to search for an employee.
                let searchInput = $("#search-input").val().toLowerCase();
                $(".card").hide();
                for (let s = 0; s < $(".card").length; s++) {
                    if ($("#name" + s)[0].innerText.toLowerCase().indexOf(searchInput) != -1)
                        $(".card")[s].style.display = "block";
                }
            });

            $("#modal-prev").on("click", function () { //once a user is selected you can toggle between users Exta-Credit
                currentIndex = parseInt(currentIndex) - 1;
                if (currentIndex < 0)
                    currentIndex = 0;
                populateModalCardPopup(currentIndex);
            });

            $("#modal-next").on("click", function () { //once a user is selected you can toggle between users Exta-Credit
                currentIndex = parseInt(currentIndex) + 1;
                if (currentIndex > 11);
                currentIndex = 11;
                populateModalCardPopup(currentIndex);
            });
        }
        
    });


    function createEmployeeRolodex() { // Provides each individual card with some employee info.
        for (let i = 0; i < employeeRolodex.length; i++) {
            let card =
                `<div class="card" index="${i}">
                   <div class="card-img-container">
                      <img class="card-img" src="${employeeRolodex[i].picture.large}" alt="profile picture">
                   </div>
                   <div class="card-info-container">
                      <h3 id="name${i}" class="card-name cap">${employeeRolodex[i].name.first} ${employeeRolodex[i].name.last}</h3>
                      <p class="card-text">${employeeRolodex[i].email}</p>
                      <p class="card-text cap">${employeeRolodex[i].location.city}, ${employeeRolodex[i].location.state}</p>
                   </div>
                </div>`;

            gallery.append(card);


        }
    }


    function createModalCardPopup() { //Provides a pop up for each employee with more detailed info.
        let modalCardPopup =
            ` <div class="modal-container">
             <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
            <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
            <h3 id="name" class="modal-name cap">name</h3>
            <p class="modal-text">email</p>
            <p class="modal-text cap">city</p>
            <hr>
            <p class="modal-text">(555) 555-5555</p>
            <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
            <p class="modal-text">Birthday: 10/21/2015</p>
            </div>
            </div>`
        
        gallery.after(modalCardPopup);
        

        $(".modal-container").hide();
    }

    function createModalBtnContainer() { //gives the modal a previous and next functionality. Extra Credit.
        let modalBtnContainer=
         `<div class="modal-btn-container">
                     <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                     <button type="button" id="modal-next" class="modal-next btn">Next</button>
                 </div>`;
        $(".modal-container").append(modalBtnContainer);
        //$(".modal-btn-container").show();

    }

    function createSearch() { //Gives the search box functionality.
        let search =
            `<form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
             <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
            </form>`;
        $(".search-container").append(search);

    }

    function populateModalCardPopup(index) { //Gives the modal card popup the info needed to list.
        $(".modal-img")[0].src = employeeRolodex[index].picture.large;
        $("#name").text(employeeRolodex[index].name.first + " " + employeeRolodex[index].name.last);
        $(".modal-text")[0].innerText = employeeRolodex[index].email;
        $(".modal-text")[1].innerText = employeeRolodex[index].location.city;
        $(".modal-text")[2].innerText = employeeRolodex[index].cell;
        $(".modal-text")[3].innerText = employeeRolodex[index].location.street + ", " + employeeRolodex[index].location.city + ", " + employeeRolodex[index].location.state + ", " + employeeRolodex[index].location.postcode;

        const DOB = employeeRolodex[index].dob.date.split("T");
        const DOBArr = DOB[0].split("-");
        const year = DOBArr[0];
        const month = DOBArr[1];
        const day = DOBArr[2];

        $(".modal-text")[4].innerText = "Birthday: " + month + "/" + day + "/" + year;

    }

});