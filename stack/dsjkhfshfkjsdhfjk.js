@layout('views/layouts/main')





@section('content')

<!-- Inner Page Banner Start -->

@if(customCompute($featured_image))
<section class="innerPageBanner position-relative fadeIn">
    <img src="{{ base_url('uploads/gallery/'.$featured_image->file_name) }}" alt="{{ $featured_image->file_alt_text }}" class="innerPageBannerImg position-absolute">
    <div class="innerPageBannerOverlay position-absolute z-2"></div>
    <div class="container z-3 position-relative">
        <div class="row">
            <div class="offset-xl-2 col-xl-8 offset-lg-1 col-lg-10 col-md-12 col-sm-12 text-center innerPagebannerCol">
                <h1 class="fw-bold text-white">{{ $page->title }}</h1>
            </div>
        </div>
    </div>
</section>
@endif
<!-- Inner Page Banner End -->
@if(!empty($schoolList))

    <?php 
    $i  =1;?>
    @foreach($schoolList['users'] as $school)
    <?php
    $combinedDataJson;
        $customfieldValue = array();
        $mappingValues = $school['custom_fields'];
        if(!empty($mappingValues)){
            $customfieldValue =json_decode($mappingValues, true);


        }    
    ?>

  @endforeach    
@endif

<!-- School Start -->
<section class="school mt-0 " style="background-color: white; " >
    <!-- <div class="container"> -->
        <div class="row mt-0">
            <div class="col-12 w-100 h-100 mt-0">
                <div class="detailsCard w-100 h-100 mt-0">

                </div>
                <div class="filterBar p-4 bg-secondary-subtle mb-5 d-flex align-items-center justify-content-between gap-3 rounded flex-wrap w-100">
                    <div class="filterOption d-flex align-item-center justify-content-center gap-3 w-100">
                        <p class="mb-0 pt-2">Filter by  :</p>

                        <!--  -->

                        <!-- style="display:none;" -->
                        <select  style="display:none;" class="form-select" aria-label="Filter by" name="schoolname" id="schoolname" onchange="schoolNameFilter()">
                            <option  style="display:none;"  value="" selected>College name</option>
                            @foreach($schoolList['users'] as $school)
                            <!-- <option value="<?php echo $school['ib_name'] ?>"> -->
                            <?php echo $school['ib_name'] ?></option>
                            @endforeach
                        </select>


                        <!--  -->

                        <select class="form-select" aria-label="Filter by" name="schooltype" id="schooltype" onchange="schoolTypeFilter()">
                            <option value="">Select Tvet College Type</option>
                            <option value="industrial_college">Industrial College</option>
                            <option value="polytechnic_college">Polytechnic College</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="centre_of excellency">Centre of Excellency</option>
                        </select>
                        <select class="form-select" aria-label="Filter by" name="schoolsubcity" id="schoolsubcity" onchange="schoolSubcityFilter()">                            
                            <option value="">Select sub city</option>
                            <option value="84">Addis Ketema</option>
                            <option value="85">Akaky Kaliti</option>
                            <option value="86">Arada</option>
                            <option value="87">Bole</option>
                            <option value="88">Gullele</option>
                            <option value="89">Kirkos</option>
                            <option value="90">Kolfe Keranio</option>
                            <option value="91">Lideta</option>
                            <option value="92">Nifas Silk-Lafto</option>
                            <option value="93">Yeka</option>
                            <option value="94">Lemi-Kura</option>
                        </select>

                        <select class="form-select" aria-label="Filter by" name="distance" id="distance" onchange="filterMarkers()">
        <option value="none">choose distance</option>

        <option value="10">10 km</option>
        <option value="20">20 km</option>
        <option value="30">30 km</option>
        <option value="50">50 km</option>
        <option value="60">60 km</option>
        <option value="100">100 km</option>
        <option value="999999">all</option>

    </select>
                    </div>                    
                    <!-- <div class="searchBox d-flex align-items-center"> -->

                        <!-- <div> -->
                    </div>

                </div>

                <div class="map-box">
                    <div class=" positon-relative  " style="display:flex;flexDirection:column;"  >
                    <!-- <div> -->
                        <div class="side-bar p-2" id="sidebarid"   >
                            <div id="inputBox" class="d-flex bg-white  ">
                        <input type="text" class="form-control border-0 " name="schoolname"  id="searchschool" placeholder="Search" onkeypress="schoolNameFilter()" onblur="schoolNameFilter() oninput="schoolNameFilter()" >
                        <!-- <datalist style="display:block;" id="schoolSuggestions"></datalist></div> -->
                        <button  class="searchBtn border-0 bg-white "  onclick="schoolNameFilter()">
                            <svg   xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </button>
                    </div>
                    <div class="justify-space-between d-flex" style="display: flex; flex-direction: row;justify-content: space-between;">
                        <p class="p-2" id="college-names">Colleges</p>
                        
                        <p  class="p-2" style="display:none;" id="college-description" >Description</p>
                        <p class="p-2 border-1  border-black " onclick="resetData()" >Reset</p>
                        
                    </div>
                    <p class="" id="locationTag" style="display:none;">Location based Results </p>
                            <div class="list-section">

                        <!-- <ul class="custom-list ">
    @foreach($schoolList['users'] as $school)
        <li class"p-2 bt-1" value="{{ $school['ib_name'] }}" name="schoolname" onclick="searchfiltervalue('{{ $school['ib_name'] }}')" >{{ $school['ib_name'] }}</li>
    @endforeach
</ul> -->


<ul id="dynamic-list" class="custom-list ">
    </ul>
<ul id="location-list" class="custom-list ">
</ul>
<ul id="location-contents" class="custom-list ">
</ul>

    <!-- PHP loop to generate list items initially -->

<ul id="dynamic-contents" class="custom-list ">
    <!-- PHP loop to generate list items initially -->

</ul>
<!-- <div id="listContents" ></div> -->
    <!-- @foreach($schoolList['users'] as $school) -->
        <!-- <li class="p-2 bt-1" onclick="searchfiltervalue('{{ $school['ib_name'] }}')">{{ $school['ib_name'] }}</li> -->
    <!-- @endforeach -->
<!-- </ul> -->

<!-- <ul class="custom-list">
$storedData = $_SESSION['combinedData'];

if ($storedData) {
    $combinedData = json_decode($storedData, true);

    echo '<ul class="custom-list">';
    
    foreach ($combinedData as $item) {
        echo '<li class="p-2 bt-1" value="' . $item['ibName'] . '" name="schoolname" onclick="searchfiltervalue(\'' . $item['ibName'] . '\')">' . $item['ibName'] . '</li>';
    }

    echo '</ul>';
}



<!-- s -->
    </div>
                        </div>
                        <div id="map" style="height: 700px;width:100%"  ></div>
    <!-- </div> -->
        <!-- margin-Left:270px; -->
        <!-- <div class="absolute-box" style="background-color: blue; height: 600px; position: absolute; top: 0; left: 0; width: 250px; z-index: 400;"></div> -->
    </div>
</div>
       

            </div>
        </div>
    </div>
</section>
<!-- <script>
    function fetchFilteredData() {
    // Gather filter criteria (e.g., schooltype, schoolsubcity, distance)
    var filters = {
        schooltype: document.getElementById('schooltype').value,
        schoolsubcity: document.getElementById('schoolsubcity').value,
        distance: document.getElementById('distance').value
        // Add other filters as needed
    };

    // Make an Ajax request to fetch filtered data
    // Use a server route or endpoint to handle the filtering logic
    // Update the URL and method based on your server implementation
    $.ajax({
        url: '/path/to/filter-endpoint',
        type: 'GET', // Change to 'POST' if needed
        data: filters,
        success: function(response) {
            // Assuming the response is an array of filtered data
            updateSidebar(response);
            // You may also update the map markers based on the filtered data
            updateMapMarkers(response);
        },
        error: function(error) {
            console.error('Error fetching filtered data:', error);
        }
    });
}
document.getElementById('schooltype').addEventListener('change', fetchFilteredData);
document.getElementById('schoolsubcity').addEventListener('change', fetchFilteredData);
document.getElementById('distance').addEventListener('change', fetchFilteredData);
document.getElementById('searchschool').addEventListener('input', fetchFilteredData);

    </script> -->

    <!-- <script>
    var combinedDatas = <?php //echo $combinedDataJson; ?>
    console.log(combinedDatas);
    function searchfiltervalue(element) {
    // Retrieve the ibName value from the clicked list item
    var ibName = element.getAttribute('data-ibName');

    // Use the ibName value as needed
    console.log('Clicked IB Name:', ibName);

    // Add your additional logic here
}

</script> -->


<!-- <script>
    // Retrieve the value from sessionStorage
var storedData = sessionStorage.getItem('combinedData');

// Check if there's any stored data
if (storedData) {
    // Parse the JSON string back to an object
    var combinedDatam = JSON.parse(storedData);

    // Access the ibName property and create a list
    var ulElement = document.createElement('ul');
    ulElement.className = 'custom-list';

    combinedDatam.forEach(function (item) {
        var liElement = document.createElement('li');
        liElement.className = 'p-2 bt-1';
        liElement.textContent = item.ibName;

        // Assuming you want to trigger a function when the list item is clicked
        liElement.onclick = function () {
            searchfiltervalue(item.ibName);
        };

        ulElement.appendChild(liElement);
    });

    // Append the generated list to a container in your HTML
    var containerElement = document.getElementById('yourContainerId');
    containerElement.appendChild(ulElement);
}

    </script> -->

<script>
function searchfiltervalue(e){
    document.getElementById('searchschool').value = e;
    console.log(e,'e');

    // 

    // if (mapInitialized) {
    //     map.remove();
    // }


    // function initializeMap() {
    // // Specify the coordinates for the initial center
    // const initialCenter = [51.505, -0.09];  // Example: Latitude and Longitude

    // // Create a map and set the initial view
    // const map = L.map('map').setView(initialCenter, 13);  // 13 is the zoom level

    // // Add a tile layer to the map (you can choose a different provider)
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: '© OpenStreetMap contributors'
    // }).addTo(map);

    // // Add a marker at the initial center
    // L.marker(initialCenter).addTo(map);

    // // Set a flag to indicate that the map has been initialized
    // mapInitialized = true;
//   }

  // Call the function to initialize the map
//   initializeMap();
    // 
}

//    function handleListItemClick(value) {
//         // Perform your onclick action with the chosen value
//         console.log('Chosen value:', value);
//     }

// function resetData() {
//     console.log('working')
//     searchfiltervalue("");
//     // var collegeNameList = document.getElementById('college-names');
//     // collegeNameList.style.display = 'none';
    
    
//     var collegeDescriptions = document.getElementById('college-description');
//     collegeDescriptions.style.display = 'none';
    
//     var listContainer = document.getElementById('dynamic-list');
//     listContainer.style.display = 'block';
//     var listContents = document.getElementById('dynamic-contents');
//     listContents.style.display = 'none';
// }

</script>
<style>

    /* markers customization */
/* .custom-icon:hover{
    transform: scale(4.5) !important;
    color: #000 !important;
    font-size: 14px !important;
      color: red !important;


} */

.leaflet-marker-icon:hover{
    color:blue !important;
}
.custom-icon.green{
    color: red !important;

}



    /* markers customization */


    /* .block{
        display:block;
    }

.none{
    display:none;
} */
    .list-section{
        height:545px;
        margin-top:5px;
    overflow-x:hidden;
    scrollbar-width: thin;
    scrollbar-gutter: stable both-edges;
    scrollbar-color: red;   

    /* overflow: scroll; */
    background-color:white;

    }

.custom-list {
        list-style: none;
        padding: 2px; /* Adjust the padding as needed */
    }

    .custom-list li {
        border-bottom: 1px solid lightgrey;
        cursor: pointer;
        padding: 10px; /* Adjust the padding as needed */
    }
    .custom-list li:hover {
    font-weight: 800;
}

        ul {
        list-style: none;
    }


    #dynamic-list li {
        border-bottom: 1px solid lightgrey;
        cursor: pointer;
        padding: 10px;

    }
    #dynamic-list li:hover{
        font-weight: 800;

    } 
.side-bar{
    /* width:400px; */
    /* background-color:#fffff !important; */
    height:700px;
    border-top:4px solid #09375b;
        /* border:4px solid #09375b; */
        border-left:4px solid #09375b;

        border-bottom:4px solid #09375b;
    /* overflow-y: scroll; */
    /* overflow-x:hidden; */
    /* background-color: white !important; */
    background-color:#E0E0E0;

    width: 450px;
    list-style: none;
    

    /* position: absolute; */
}

    div.dataTables_wrapper div.dataTables_paginate ul.pagination 
    {
    margin: 2px 0;
    white-space: nowrap;
    list-style: none;
    padding-left: 0;
    display: flex;
    align-items: center;
    }
div.dataTables_wrapper div.dataTables_paginate ul.pagination li.active a 
{
    /* background-color:#124ec7; */
    color: #124ec7;
    border-color: #124ec7;
    margin: 2px 0;
    padding-left: 0;
    display: flex;
    align-items: center;
}


.leaflet-popup
{

}


.map-box
{
    /* background-color:blue; */
    height:700px;
    width:100%;


}

 .modal 
{
            display: block;
            position: absolute;
            top: 0;
            left: 0;


}
.modal-content
 {
            background-color: red;
            /* height:'2500px'; */
    /* width:'50%'; */
            text-align: center;
}
        
#map 
{
    border:4px solid #09375b;

            /* border-top-left-radius: 30px;
            border-top-right-radius: 30px; */

            /* border-radius:15px; */
            /* z-index: -1000; */
}

.leaflet-popup
{
            bottom:25px !important;
                    /* background-color: red; */
                    /* height:300px;s */

            /* right:20px !important; */
}

.leaflet-popup-content-wrapper
{
            overflow-Y:scroll;
            /* background-color: #09375b !important;#1c5fa8 */
            background-color: #09375b !important;

            border:3px solid white;

            color:#fff !important;
            font-size:16px;
            border-radius:50px;

            /* height:160px; */
}

.leaflet-popup-content-wrapper::-webkit-scrollbar 
{
    display: none;
}



.custom-icon.blue  
{
    fill: blue;
}

.custom-icon.red 
{
    fill: red;
}

.custom-icon.green 
{
    fill: green;
}

.custom-icon.orange 
{
    fill: orange;
}




.content 
{
            margin: 0 !important; 
            padding: 0 !important;
}

.content p 
{
            margin: 0 !important;
            padding: 0 !important;
            margin-bottom: 1px !important; 
}



.whitestroke 
{
    text-decoration: none; /* Remove underline */
    /* color: #09375b; Set text color */
    color:red !important;
    -webkit-text-stroke: 4px white; /* Add white stroke/outline */
}


#searchPredictions{
        position:absolute;
        z-index: 100000;
        background-color: #fff;

    }

.leaflet-top{
    /* display:none !important; */
    z-index: 400 !important;

}
.pointer-cursor {
    cursor: pointer;
}



@keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    /* Apply the animation to the element with ID 'map_details' */
    #map_details {
        animation: fadeIn 1s ease-in-out; /* Adjust duration and timing function as needed */
        display: none; /* Hide the element by default */
    }




</style>
<!-- School End -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <link rel="manifest" crossorigin="use-credentials" href="manifest.json"/>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script type="text/javascript" src="<?php echo site_asset_url() ?>admin/js/DataTables/datatables.js"></script>
    <script type="text/javascript" src="<?php echo site_asset_url() ?>admin/js/datatables-col-resize/jquery.dataTables.colResize.js"></script>
    <script type="text/javascript" src="<?php echo site_asset_url('admin/js/programsModuleCommon.js') . '?v=' . JS_VERSION ?>"></script>
    <script type="text/javascript" src="<?php echo site_asset_url('admin/js/main.js') . '?v=' . JS_VERSION ?>"></script>

    <script>


    let map = null;
    let markers = [];








// 



    </script>

<script>
    // Use single quotes for JSON string since it's in PHP

    // try {
    //     var combinedDatas = JSON.parse(combinedDataJson);
    //     console.log(combinedDatas);
    // } catch (error) {
    //     console.error('Error parsing JSON:', error);
    // }
    </script>

    <script>


// globals
    var user_Data = ''; 
    var checker=0


    var cityData = {};
const combinedData = [];

const currentUrl = new URL(window.location.href);
        const params = new URLSearchParams(currentUrl.search);
        // const currentIndex = params.get('index');


    let mapInitialized = false;


// globals
// var schoolLat;
// var  schoolLng;
// var zoom


//global functions here

var schoolLat;
var  schoolLng;
var zoom;


 schoolLat="9.1450";
  schoolLng="40.489673";
 zoom="7";


//global functions here

document.body.addEventListener('click', latitudelong);
    
function latitudelong(){
    schoolLat = sessionStorage.getItem('schoolLat');
    schoolLng = sessionStorage.getItem('schoolLng');
    zoom = sessionStorage.getItem('zoom');


    // Use the values as needed

    // console.log('schoolLat:', schoolLat, 'schoolLng:', schoolLng);

    return {schoolLat,schoolLng,zoom}

} 

//global functions here


    



// var schLat;
// var  schLng;
// var Z;


function sendLats(lat,lng){
    renderSchools();
    console.log("workkkk")
    if (!isNaN(lat) && !isNaN(lng)  ) {
    sessionStorage.setItem('schoolLat', lat);
    sessionStorage.setItem('schoolLng', lng);
    sessionStorage.setItem('zoom', "8");

    }
    // zoom ="14";
    // schoolLat="29.1450";
    // schoolLng="80.489673";
    // console.log(typeof schoolLat,typeof schoolLng)
    // return {schoolLat,schoolLng,zoom};/
    // return {parseint(schoolLat),parseint(schoolLng),parseint(zoom)}
    
}


console.log(schoolLat,schoolLng,zoom,'outtt')






// global functions ends here 


    var __serverProtocol = '<?php echo SERVER_PROTOCOL; ?>';
    var __clientIdp = '<?php echo clientIdp; ?>';
    var __filter_schoolname = '0';
    var __filter_schooltype     ='0';
    var __filter_schoolsubcity  ='0';
    var __filter_schoolworeda  ='0';



    // console.log($school['ib_name'],'ib_name')
    $(document).ready(function() 
    {

        
        let url                = '<?php echo base_url('frontend/default/assets/js/regions.json')?>';
        // console.log(url,'url');
        fetch(url)
        .then(res => res.json())
        .then(out =>{
                     cityData = out;
                    renderSchools();

            // console.log(cityData,'cityData');
                    })
        .catch(err => { throw err });
    });

    function renderSubCity(subcityId)
    {
      //  let cityId = '12';
        let subcityName='-';
            // console.log(cityData,'citydata');
            // console.log(cityData.zone);
        if(Array.isArray(cityData.zone))
        {
            let subCityData = cityData.zone.filter((subCity)=>{
                if(subCity.id == parseInt(subcityId) ){
                    subcityName = subCity.value
                }
            })

        }
        return subcityName;

    }
    
    function schoolNameFilter(){
        renderSchools();
        const input = document.getElementById('searchschool');
        const filter = input.value.toLowerCase();
        const listItems = document.querySelectorAll('.custom-list li');

        listItems.forEach(item => {
            const itemName = item.textContent.toLowerCase();
            if (itemName.includes(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        
    }
    function schoolTypeFilter(){
        renderSchools();
    }
    function schoolSubcityFilter(){
        renderSchools();
    }


    var selectedDistance="";
    var userLat="";
var userLng="";

    function filterMarkers() {
        var locationContainer = document.getElementById('location-list');
    locationContainer.innerHTML = ""
        renderSchools();





    // Get the selected distance from the dropdown
    selectedDistance = parseInt(document.getElementById('distance').value);



    if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
    userLat = position.coords.latitude;
     userLng = position.coords.longitude;






    });
} 


return selectedDistance,userLat,userLng;
}


console.log(selectedDistance,'selectedDistance')

    

    function renderSchools(){
        

console.log(schoolLat,schoolLng,zoom,'sdfsdfsdfsdfsdfsd')

        
        // const searchInput = document.getElementById('searchschool')
        // __filter_schoolname  =searchInput.value;
         __filter_schoolname    = document.querySelector("[name='schoolname']").value;
        __filter_schooltype    =document.querySelector("[name='schooltype']").value;
        __filter_schoolsubcity =document.querySelector("[name='schoolsubcity']").value;
        // __filter_schoolworeda  =document.querySelector("[name='schoolworeda']").value;

        var keyword         = elById('searchschool').value;  
        // const searchInput = document.getElementById('searchschool');
        // var keyword  =searchInput.value;
        markers = [];        

        const extraFilter = {};
            extraFilter.ib_name = __filter_schoolname;
            extraFilter.college_type = __filter_schooltype;
            extraFilter.college_subcity = __filter_schoolsubcity;
            extraFilter.school_woreda = __filter_schoolworeda;
            extraFilter.keyword = keyword;
            var otherFilter     = JSON.stringify(extraFilter);

        var postData = {};
        postData['other_filters'] = otherFilter;
        $.ajax({
            method: "POST",
            url: __serverProtocol + __clientIdp +'/get_allorganisation',
            data: postData
        })
        .done(function( data ) {


            user_Data = JSON.parse(data);



  userData(user_Data);
  handleUserData();
  
        });

    
    }

    


    function userData(users) {
  user_Data = users;

  handleUserData(); 
}




function handleUserData() {
  // Place the code that uses user_Data here
//   console.log(user_Data, 'user_Data');

        const searchInput = document.getElementById('searchschool');

        // console.log(searchInput.value,'searchInput')
//


  

const allCustomFields = []; 



if (user_Data && user_Data.users) {
  user_Data.users.forEach(user => {     
    //   listContents.innerHTML = combine.telephone;

    if (user.custom_fields) {
      try {
        const customFields = JSON.parse(user.custom_fields);
        // today
        
        // today


        allCustomFields.push(customFields); 

        // console.log('Parsed custom fields: ', customFields);
      } catch (error) {
        console.error('Error parsing custom_fields:', error);
      }
    }
  });
}
updateCombinedDataFromUserAndCustomFields()



// console.log(,)
// cc
function updateCombinedDataFromUserAndCustomFields() {

    var newCombinedData = [];
    var combinedData=[]



    // console.log(allCustomFields.length,user_Data.users.length)
// if (allCustomFields.length === user_Data.users.length-1) {
    for (let i = 0; i < allCustomFields.length; i++) {
        const latitude = parseFloat(allCustomFields[i].latitude);
        const longitude = parseFloat(allCustomFields[i].longitude);
        const collegeType = allCustomFields[i].tvet_college_type;
        // const collegeType="industrial_college";
        const telephone   =allCustomFields[i].telephone;
        // const finalIndexData =i;
        const ownership=allCustomFields[i].ownership;
        const year_of_establishment =allCustomFields[i].year_of_establishment;
        



        const ibName = user_Data.users[i].ib_name;
        const domain_name = user_Data.users[i].domain_name;
        const ib_class_strength = user_Data.users[i].ib_class_strength;
        const ib_institute_code = user_Data.users[i].ib_institute_code;
        const ib_head_email = user_Data.users[i].ib_head_email;


        

        // console.log('All checckk Fields:------------', );



        // Create an object with the desired properties and add it to the combinedData array
        const data = {
            latitude: latitude,
            longitude: longitude,
            collegeType: collegeType,
            telephone :   telephone,
            // finalIndexData:finalIndexData,
            image: 'https://img-c.udemycdn.com/notices/home_carousel_s…de/image/1a871a12-4289-4d90-90e8-641d10a73f69.jpg',
            ib_head_email:ib_head_email,
            ib_institute_code:ib_institute_code,
            ib_class_strength:ib_class_strength,
            domain_name:domain_name,
            year_of_establishment:year_of_establishment,
            ownership:ownership,





            ibName: ibName,
        };

        newCombinedData.push(data);
        combinedData = newCombinedData;

        // $combinedDataJson = json_encode($combinedData);

        // 
        var collegeNameList = document.getElementById('college-names');
    // collegeNameList.style.display = 'block';
    
    
    var collegeDescriptions = document.getElementById('college-description');
    // collegeDescriptions.style.display = 'block';


        var listContainer = document.getElementById('dynamic-list');
        // renderSchools();

        listContainer.className = 'block';

        listContainer.innerHTML = "";
        // var listItem = document.createElement('li');
            // listItem.className = 'p-2 bt-1';
            // listItem.value = combinedData.ibName;
            // listItem.name = 'schoolname';

            combinedData.forEach(function(item) {
                var listItem = document.createElement('li');
                var paraItem = document.createElement('p');
                var noData = false;

        listItem.className = 'p-2 bt-1';
        paraItem.className = 'p-2 bt-1';
        paraItem.textContent = "NO DATA";


        const searchInput = document.getElementById('searchschool');
        // searchInput.addEventListener('input', function(event) { 
        const finalSearchValue = searchInput?.value?.toLowerCase(); // Convert to lowercase for case-insensitive search
        // const finalSearchValue = event.target.value.toLowerCase();
        
if(finalSearchValue === " "){
    resetData();
}
// });

if (item?.ibName?.toLowerCase().includes(finalSearchValue)) {
    listItem.value = item.ibName;
    listItem.name = 'schoolname';
    listItem.textContent = item.ibName;
    listItem.onclick = function() {
        searchfiltervalue(item.ibName);
        sendLats(item.latitude,item.longitude,"10")
    
    
            // Add onclick event to pass the value to searchfiltervalue
    
    
                var collegeNameList = document.getElementById('college-names');
        collegeNameList.style.display = 'none';
        
        
        var collegeDescriptions = document.getElementById('college-description');
    collegeDescriptions.style.display = 'block';
    
                listContainer.style.display = 'none';
                // listContainer.className = 'd-none';
                // inputHidden.classList.remove('d-none d-block');

    
    
    
                // 
                var listContents = document.getElementById('dynamic-contents');
                listContents.style.display = 'block';
    
                // listContents.innerHTML = item.ibName;
    
                // console.log(combinedData.ibName,'f');
    
    
                // listContainer.className = 'none';
                // var listContents = document.createElement('p');
                // listContents.textContent=item.ibName;
    
    
                combinedData.forEach((combine,index) => {
        if (combine.ibName === item.ibName) {
            
            // console.log(index)
            // const currentUrl = new URL(window.location.href);
            // const params = new URLSearchParams(currentUrl.search);
            const currentIndex = params.get('index');
            params.set('index', index);
    
            // mapChange(index);
    
            console.log(combine);
            
    
            // combine.latitude and combine.longitude
            // Assuming "map" is your Leaflet map instance
    //         map.remove();
    // const newCenter = L.latLng(combine.latitude, combine.longitude);
    // map.setView(newCenter, map.getZoom());
    
    
          // Get the current index value
            
            // Assuming index is a variable you want to update
            // let index = 2; // Replace with your actual index value
    
            // Update the index in the URL parameters
            
            // console.log(currentIndex,'dfsdfsdf')
    // Replace the current URL with the updated parameters
    // history.replaceState(null, null, `?${params.toString()}`);
    
        // <div class="pointer-cursor" style="font-weight: 800;cursor:pointer;"  >X</div>
            // 
            listContents.innerHTML = `
    <div style="user-select: none;">
    <div class="w-100 d-flex justify-content-end">
    </div>
    <div classname='content' style="">
    <p style="margin-left: 1.5em;font-weight: bold;text-transform: uppercase;">&emsp;&emsp;&emsp;${combine.ibName}</p>
    
    <img src="https://fastly.picsum.photos/id/722/200/300.jpg?hmac=MDrZtULoytyxS357HVHCqzJRUv_BsxU0MEgszPVuMyY"  style="object-fit: cover;border-radius: 23px;border:2px solid white;height: 176px;"  alt="Image" width="100%;" height="100">
    </div>
    <ul>
    <li>
        <p>college specialized: ${combine.collegeType}</p>
    </li><li>
    
        <p> ownership: ${combine.ownership}</p>
    </li>
    </div>
    
    <ul>
    <li>
    
        <p> Website: <a   href="${combine.domain_name}" target="_blank">${combine.domain_name}</a></p>
    </li>
    <div >
    
    <li>
    
        <p>Telephone: ${combine.telephone}</p>
    </li><li>
    
        <p> Institute_code: ${combine.ib_institute_code}</p>
    </li><li>
    
        <p> Class strength: ${combine.ib_class_strength}</p>
    </li><li>
    
        <p> Established on: ${combine.year_of_establishment}</p>
    </li>
    
    
    </ul>
    
    
    
    </div>
    </div>
    
    
    `;
    
    // style="pointer-events: none;user-select: none;"
            // If matched, update the combinedData.ibName or store in an array
            // console.log(`Matching item found: ${combine.ibName}`);
    
            // console.log(combine,'dsfsdfsdfsdfdsf');
        }
        
        
    });
            };
            listContainer.appendChild(listItem);
        } else {
//             checker++;
//             console.log(checker,"index")
//             if(checker=1){
    // listItem.textContent = 'nothing matches';
    // listContainer.appendChild(listItem);
// }   
    // listContainer.textContent = 'nothing matches';


    
}
        // });

        // Add the new list item to the list container
    });









        // 


$combinedDataJson =JSON.stringify(combinedData)


var combinedDataz = <?= $combinedDataJson ?>
    
    // Function to update the list based on combinedData
    function updateLists() {
        var listContainer = document.getElementById('dynamic-list');

        // Clear existing list items
        listContainer.innerHTML = '';

        // Append new list items based on combinedData
        combinedDataz.forEach(function(item) {
            var listItem = document.createElement('li');
            listItem.className = 'p-2 bt-1';
            listItem.value = item.ibName;
            listItem.name = 'schoolname';
            listItem.onclick = function() {
                searchfiltervalue(item.ibName);
                sendLats(parseint(item.latitude),parseint(item.longitude))
                console.log(parseint(item.latitude),parseint(item.longitude),'sdfsdfsdfsdfsdfsd')


            };
            listItem.textContent = item.ibName;

            // map.remove();
    // const initialCenter = [51.505, -0.09];  // Example: Latitude and Longitude

    //            const map = L.map('map').setView(initialCenter, 13);  // 13 is the zoom level

    // // Add a tile layer to the map (you can choose a different provider)
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: '© OpenStreetMap contributors'
    // }).addTo(map);

            listContainer.appendChild(listItem);
        });
    }



        


    }

    sessionStorage.setItem('combinedData', JSON.stringify(combinedData));
    

        // console.log('Combined    --------- Data:', combinedData.ibName);
    
    
    // cc
    
    






// mapppppppppppppppp
initializeMap()
// document.addEventListener("click", initializeMap());


function initializeMap() {


// console.log(selectedDistance'selectedDistance')

    
    // mapCombine()

    if (mapInitialized) {
        map.remove();
    }


    // console.log(userLat,userLng,'sdfsdfsdf');


 










var selectElement = document.getElementById('schoolsubcity');

// Get the value of the currently selected option

var selectedValue = selectElement.value;

if(selectedValue){
    subcityLocation()
}

function subcityLocation(){

if (selectedValue == 84){

 schoolLat="9.0334";
 schoolLng="38.7316";
 zoom=15;

}else if (selectedValue == 85){

schoolLat="9.0435";
schoolLng="38.7436";
zoom=15;

}else if (selectedValue == 86){

schoolLat="9.0256";
schoolLng="38.7382";
zoom=15;

}else if (selectedValue == 87){

schoolLat="9.0357";
schoolLng="38.7719";
zoom=15;

}else if (selectedValue == 88){

schoolLat="9.0725";
schoolLng="38.7655";
zoom=15;

}else if (selectedValue == 89){

schoolLat="  9.0083";
schoolLng="38.7611";
zoom=15;

}else if (selectedValue == 90){

schoolLat="9.0987";
schoolLng="38.7611";
zoom=15;

}else if (selectedValue == 91){

schoolLat="9.0403";
schoolLng="38.7418";
zoom=15;

}else if (selectedValue == 92){

schoolLat="9.0915";
schoolLng="38.7415";
zoom=15;

}else if (selectedValue == 93){

schoolLat="9.1265";
schoolLng="38.7614";
zoom=15;

}else if (selectedValue == 94){

schoolLat="9.1419   ";
schoolLng="38.7247";
zoom=15;

}
return schoolLat, schoolLng,zoom;
}

    // console.log('Selected Value:', selectedValue);


//     if(searchInput && searchInput.value && searchInput.value.trim().toLowerCase() === data.ibName.toLowerCase()){
    
// }




//   sssssssssss
if(selectedDistance &&( selectedDistance  !== NaN ||selectedDistance !==null )){

    // if(userLat!=''){consol



if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
    userLat = position.coords.latitude;
     userLng = position.coords.longitude;






        const userMarker = L.marker([userLat, userLng]).addTo(map);
        userMarker.bindPopup('Your Location').openPopup();


        
        map.setView([userLat, userLng], 12); 
    });
} 
}






function ChangedLocation(schoolLat,schoolLng){



    return {schoolLat,schoolLng,zoom}
}

//   if (mapInitialized) {
//         map.remove();
//     }


    map = L.map('map').setView([schoolLat, schoolLng], zoom); // Set an initial center and zoom level

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 14,
    }).addTo(map);

    const markers = [];


    // function


    var distanced="";
    var distanceLat="";
    var distanceLng="";


    function getDistance(userLat,userLng,lat,lng) {
        // console.log(userLat,userLng,lat,lng,'lat2')
        distanceLat=lat;
        distanceLng=lng;

        const rad = Math.PI / 180;
        const earthRadius = 6371; // Earth's radius in kilometers
        const dLat = (lat - userLat) * rad;
        const dLon = (lng - userLng) * rad;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(userLat * rad) * Math.cos(lat * rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
         distanced = earthRadius * c;
        
        return distanced,distanceLat,distanceLng    ; // Convert to meters
    }
    
    // console.log('distanced',distanced* 1000)



var searchinput= document.getElementById('searchschool');

//   console.log(searchinput.value,searchinput)



    // function  /




    // if (searchInput.value && data.ibName.toLowerCase().includes(searchInput.value.toLowerCase())) {
        
    
    
    // }else {
        
    // }
    

    // function mapCombine(){

    combinedData.forEach(data => {
        const lat = parseFloat(data.latitude);
        const lng = parseFloat(data.longitude);
// console.log(data,'data')


        // Check if latitude and longitude are valid numbers

        // if(searchInput.value ==="null" || searchInput.value.toLowerCase(data.ibName)  ){}

        if (!isNaN(lat) && !isNaN(lng)  ) {

            if(selectedDistance){
                getDistance(userLat,userLng,lat,lng) 

                var inputHidden = document.getElementById('inputBox');
                inputHidden.className = 'd-none';
                var inputButtonHidden =document.getElementById('locationTag');
                inputButtonHidden.style.display='block';

              
                

                
                

               var filteredData=[]; 
               var listContainer = document.getElementById('dynamic-list');
    // listContainer.style.display = 'none';
    listContainer.style.display = 'none';

    var listdataContainer = document.getElementById('dynamic-contents');
    listdataContainer.style.display = 'none';
    var locationContainer = document.getElementById('location-list');
    // locationContainer.innerHTML = "";
    locationContainer.style.display = 'block';
    // var filteredData=[]; 

    var locationlistContainer = document.getElementById('location-list');


    // locationContainer.textContent = data[2]?.ibName;
    //

    // console.log(searchInput.value,'searchInput')


                if (distanced <= selectedDistance) {
var newDistance =selectedDistance;
                    // console.log('working',lat,lng)
                    if(selectedDistance != newDistance ){
    locationContainer.innerHTML = "";


                    }

                    
                    filteredData.push(data);

// 
filteredData.forEach(function(item) {
                var listItem = document.createElement('li');

                // console.log(filteredData,'filteredDataitemitem')


        listItem.className = 'p-2 bt-1';
        listItem.value = item.ibName;
        listItem.id="list-list-id"
    listItem.name = 'schoolname';
    listItem.textContent = item.ibName;

    
    
    // listItem.onclick = function() {
        
        locationContainer.appendChild(listItem);
    });




// 



            const distancedNumber = distanced.toFixed(2)


            // console.log('heredatadatadatadata',filteredData)
        // }






            


           
            const collegeType = data.collegeType;













            

            
            let iconColor = 'blue'; 
let iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg>'; // Default SVG


            if (collegeType === "manufacturing") {
                iconColor = 'red';
               let iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg>'; // Default SVG

            } else if (collegeType === "polytechnic_college") {
                iconColor = 'green';
            let iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg>'; // Default SVG

        } else if (collegeType === "industrial_college") {
                iconColor = 'blue';
            let iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg>'; // Default SVG

        } else if (collegeType === "centre_of excellency") {
                iconColor = 'orange';
            let iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg>'; // Default SVG

            } 



const popupContent = `
<div style="pointer-events: none;user-select: none;">
<div classname='content' style="">
<p style="margin-left: 1.5em;font-weight: bold;text-transform: uppercase;">&emsp;&emsp;&emsp;${data.ibName}</p>

</div>
<ul style="margin-Top:8px;">
<li>Total distance : ${distancedNumber} km's
</li>
</ul>

</div>


`;





// done




            const marker = L.marker([lat, lng],
             {
                icon: L.divIcon({
                    className: `custom-icon ${iconColor}`,
                    html: iconSvg,
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                })
            }).bindPopup(popupContent,{ direction: 'top' }).openTooltip();

            marker.on('popupopen', function (event) {


// console.log(data.ibName,'data.ibName')   
var listContainer = document.getElementById('location-list');

listContainer.style.display = 'none';
// listContainer.className = 'd-none';





// 
var listContents = document.getElementById('dynamic-contents');
listContents.style.display = 'block'; 
// listContents.className = listContents.className + ' d-block'; 




searchfiltervalue(data.ibName);

history.replaceState(null, null, `?${params.toString()}`);

// <div class="pointer-cursor" style="font-weight: 800;cursor:pointer;"  >X</div>
// 

listContents.innerHTML = `
<div style="user-select: none;">
<div class="w-100 d-flex justify-content-end">
</div>
<div classname='content' style="">
<p style="margin-left: 1.5em;font-weight: bold;text-transform: uppercase;">&emsp;&emsp;&emsp;${data.ibName}</p>

<img src="https://fastly.picsum.photos/id/722/200/300.jpg?hmac=MDrZtULoytyxS357HVHCqzJRUv_BsxU0MEgszPVuMyY"  style="object-fit: cover;border-radius: 23px;border:2px solid white;height: 176px;"  alt="Image" width="100%;" height="100">
</div>
<ul>
<li>
<p>college specialized: ${data.collegeType}</p>
</li>
<li>Total distance : ${distancedNumber} km's

<li>

<p> ownership: ${data.ownership}</p>
</li>
</div>

<ul>
<li>

<p> Website: <a "  href="${data.domain_name}" target="_blank">${data.domain_name}</a></p>
</li>
<div style="pointer-events: none;user-select: none;">

<li>

<p>Telephone: ${data.telephone}</p>
</li><li>

<p> Institute_code: ${data.ib_institute_code}</p>
</li><li>

<p> Class strength: ${data.ib_class_strength}</p>
</li><li>

<p> Established on: ${data.year_of_establishment}</p>
</li>


</ul>



</div>
</div>


`;


});
          




            markers.push(marker);
        }
        


            // location filter end here 



        } else if ( searchinput.value  ){

            // console.log('thissa',data)

            if (data.ibName.toLowerCase().includes(searchInput.value.toLowerCase())){

                
                // const filteredData = data.filter(item => item.ibName.includes(searchInput.value));
                // console.log("filteredData",data.ibName)

            const collegeType = data.collegeType;
















            


let iconColor = 'blue';
let iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg>'; // Default SVG


if (collegeType === "manufacturing") {
    iconColor = 'red';
   let iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg>'; // Default SVG

} else if (collegeType === "polytechnic_college") {
    iconColor = 'green';
let iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg>'; // Default SVG

} else if (collegeType === "industrial_college") {
    iconColor = 'blue';
let iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg>'; // Default SVG

} else if (collegeType === "centre_of excellency") {
    iconColor = 'orange';
let iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg>'; // Default SVG

} 



const popupContent = `
<div style="pointer-events: none;user-select: none;">

<div classname='content' style="">
<p style="margin-left: 1.5em;font-weight: bold;text-transform: uppercase;">&emsp;&emsp;&emsp;${data.ibName}</p>

<img src="https://fastly.picsum.photos/id/722/200/300.jpg?hmac=MDrZtULoytyxS357HVHCqzJRUv_BsxU0MEgszPVuMyY"  style="object-fit: cover;border-radius: 7px;border:2px solid white"  alt="Image" width="100%;" height="100">
</div>






</div>
</div>


`;






// done



const marker = L.marker([lat, lng],
 {
    icon: L.divIcon({
        className: `custom-icon ${iconColor}`,
        html: iconSvg,
        iconSize: [64, 64], // Adjust the size as needed
        iconAnchor: [16, 32],
    })
}).bindPopup(popupContent,{ direction: 'top' }).openTooltip();





markers.push(marker);
        }


        }  // else ends
        else  {
            // console.log("empty")
            const collegeType = data.collegeType;
















            

// Customize the icon based on college type
let iconColor = 'blue'; // Default color
let iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg>'; // Default SVG


if (collegeType === "manufacturing") {
    iconColor = 'red';
   let iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg>'; // Default SVG

} else if (collegeType === "polytechnic_college") {
    iconColor = 'green';
let iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg>'; // Default SVG

} else if (collegeType === "industrial_college") {
    iconColor = 'blue';
let iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg>'; // Default SVG

} else if (collegeType === "centre_of excellency") {
    iconColor = 'orange';
let iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg>'; // Default SVG

} 


// pointer-events: none;
const popupContent = `
<div style="user-select: none;">

<p style="margin-left: 1.5em;font-weight: bold;text-transform: uppercase;">&emsp;&emsp;&emsp;${data.ibName}</p>


</div>


`;


// rerun();



// function rerun() {



// const marker = L.marker([lat, lng],
//  {
//     icon: L.divIcon({
//         className: `custom-icon ${iconColor}`,
//         html: iconSvg,
//         iconSize: [32, 32], // Adjust the size as needed
//         iconAnchor: [16, 32],
//     })
// }).bindPopup(popupContent,{ direction: 'top' }).openTooltip();


// done

const marker = L.marker([lat, lng], {
    icon: L.divIcon({
        className: `custom-icon ${iconColor}`,
        html: iconSvg,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
    })
});

marker.bindPopup(popupContent, { direction: 'top' });



// Add an event listener for the 'popupopen' event
marker.on('popupopen', function (event) {


    // console.log(data.ibName,'data.ibName')   
    var listContainer = document.getElementById('dynamic-list');

    listContainer.style.display = 'none';
    // listContainer.className = 'd-none';





// 
var listContents = document.getElementById('dynamic-contents');
listContents.style.display = 'block'; 
// listContents.className = listContents.className + ' d-block'; 




    searchfiltervalue(data.ibName);

    history.replaceState(null, null, `?${params.toString()}`);

    // <div class="pointer-cursor" style="font-weight: 800;cursor:pointer;"  >X</div>
// 

    listContents.innerHTML = `
<div style="user-select: none;">
<div class="w-100 d-flex justify-content-end">
</div>
<div classname='content' style="">
<p style="margin-left: 1.5em;font-weight: bold;text-transform: uppercase;">&emsp;&emsp;&emsp;${data.ibName}</p>

<img src="https://fastly.picsum.photos/id/722/200/300.jpg?hmac=MDrZtULoytyxS357HVHCqzJRUv_BsxU0MEgszPVuMyY"  style="object-fit: cover;border-radius: 23px;border:2px solid white;height: 176px;"  alt="Image" width="100%;" height="100">
</div>
<ul>
<li>
    <p>college specialized: ${data.collegeType}</p>
</li><li>

    <p> ownership: ${data.ownership}</p>
</li>
</div>

<ul>
<li>

    <p> Website: <a "  href="${data.domain_name}" target="_blank">${data.domain_name}</a></p>
    </li>
<div style="pointer-events: none;user-select: none;">

<li>

    <p>Telephone: ${data.telephone}</p>
</li><li>

    <p> Institute_code: ${data.ib_institute_code}</p>
</li><li>

    <p> Class strength: ${data.ib_class_strength}</p>
</li><li>

    <p> Established on: ${data.year_of_establishment}</p>
</li>


</ul>



</div>
</div>


`;


});


markers.push(marker);





         
    


        // below this  do
        

    }  // search input 
    // }
// }
}
// }
    });


    markers.forEach(marker => {
        marker.addTo(map);
    });

    mapInitialized = true;
}



    document.addEventListener("DOMContentLoaded", function(e) {
        $.ajax({
        method: "GET",
        url: __serverProtocol + __clientIdp +'/statisticalcountCollege'

        })
        .done(function( data ) {


            if(data){

                const dataJson = JSON.parse(data);

                document.getElementById('industrial-count').innerHTML = dataJson['industrial_college']['total'];
                document.getElementById('industrial-government').innerHTML = dataJson['industrial_college']['government'];
                document.getElementById('industrial-non-government').innerHTML = dataJson['industrial_college']['non-government'];


                document.getElementById('polytechnic-count').innerHTML = dataJson['polytechnic_college']['total'];
                document.getElementById('polytechnic-government').innerHTML = dataJson['polytechnic_college']['government'];
                document.getElementById('polytechnic-non-government').innerHTML = dataJson['polytechnic_college']['non-government'];
                
                document.getElementById('manufacturing-count').innerHTML = dataJson['Manufacturing']['total'];
                document.getElementById('manufacturing-government').innerHTML = dataJson['Manufacturing']['government'];
                document.getElementById('manufacturing-non-government').innerHTML = dataJson['Manufacturing']['non-government'];
                
                document.getElementById('excellency-count').innerHTML = dataJson['centre_of excellency']['total'];
                document.getElementById('excellency-government').innerHTML = dataJson['centre_of excellency']['government'];
                document.getElementById('excellency-non-government').innerHTML = dataJson['centre_of excellency']['non-government'];

                

            }
            

            
        });
        
    });


}

}



</script>

<script>
    function resetData() {

        selectedDistance = parseInt(document.getElementById('distance').value);

        if(selectedDistance){
    location.reload();


        }
        searchfiltervalue("");
                const searchInput = document.getElementById('searchschool');
        searchInput.value="";

    //         if('geolocation' in navigator){
    // location.reload();
    // }
    // console.log('working')
    checker=0;
    var setSchoolsubcity= document.getElementById('schoolsubcity');
    // setSchoolsubcity.options[0].text = 'Select sub city';
    // setSchoolsubcity.options[0].value = '';
    setSchoolsubcity.selectedIndex = 0;

    

    // var setSchoolsubcity= document.getElementById('schoolsubcity');
    // setSchoolsubcity.options[0].text = 'Select sub city';
    // setSchoolsubcity.options[0].value = '';
    var setSchooltype= document.getElementById('schooltype');
    // setSchooltype.options[0].text = 'Select Tvet College Type';
    // setSchooltype.options[0].value = '';
    setSchooltype.selectedIndex = 0;
    var setDistance= document.getElementById('distance');
    // setDistance.options[0].text = 'choose distance';
    setDistance.options[0].value = '';
    setDistance.selectedIndex = 0;
    setDistance.options[0].value = '';
    // console.log(setDistance.value,'sdnsldfnkldsfj')


    sendLats("9.1450","40.489673")
    var collegeNameList = document.getElementById('college-names');
    collegeNameList.style.display = 'block';
    
    
    var collegeDescriptions = document.getElementById('college-description');
    collegeDescriptions.style.display = 'none';
    
    var listContainer = document.getElementById('dynamic-list');
    listContainer.style.display = 'block';
    var listContents = document.getElementById('dynamic-contents');
    listContents.style.display = 'none';
    var locationContainer = document.getElementById('location-list');
    locationContainer.style.display = 'none';

    var inputButtonHidden =document.getElementById('locationTag');
                inputButtonHidden.style.display='none';
                var inputHidden = document.getElementById('inputBox');
// inputHidden.classList.remove('d-none');
inputHidden.style.display="none";

// renderSchools();



}

</script>



@endsection