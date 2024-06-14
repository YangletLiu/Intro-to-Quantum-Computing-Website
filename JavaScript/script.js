document.addEventListener('DOMContentLoaded', function() {
//On Load
    const currentPath = window.location.pathname;
    const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1);

    if (!sessionStorage.getItem('hasClicked')){
        if (currentFile == 'index.html'){showNotification();}
    }
//_________________________________________________________________________________________________
//GeneralizedHTML

if (currentFile !== 'index.html' && currentFile !== '') {
    const lectureBarHTML = `
        <div class="lecturebar">
            <button class="btn" data-url="Lectures.html#mainContStart">Lecture One</button>
            <button class="btn" data-url="Lectures.html#lectureTwo">Lecture Two</button>
            <button class="btn" data-url="Lectures.html#lectureThree">Lecture Three</button>
            <button class="btn" data-url="Lectures.html#lectureFour">Lecture Four</button>
            <button class="btn" data-url="Lectures.html#lectureFive">Lecture Five</button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lectureBarHTML);
}
//_________________________________________________________________________________________________

//Vars
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('close-btn');
    const blackBoxes = document.querySelectorAll('.black-box'); 
    const overlays = document.querySelectorAll('.overlay');
    const lectureButton = document.getElementById('LectureSideButton');
    const labButton = document.getElementById('LabsSideButton');
    const lectureBars = document.querySelectorAll('.lecturebar');
    let lastMouseX = 0;
    let isLecturebaropen = false;
    let isHoveringLectureButtonOrBar = false;
    let sideBarClosed = true;
//_________________________________________________________________________________________________

//Listeners
    //Redirect Buttons 
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const targetUrl = button.getAttribute('data-url');
            const url = button.getAttribute('data-url');
            if (url.startsWith('#')){
                event.preventDefault(); 
                const targetElement = document.querySelector(url);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }                
            } else {
                window.location.href = targetUrl;
            }
        });
    });

    document.addEventListener('mousemove', (e) => {
        const currentMouseX = e.clientX;
        const activationZone = window.innerWidth <= 1000 ? 60 : 20;

        if (currentMouseX < activationZone && currentMouseX < lastMouseX) {
            openSidebar();
        }

        lastMouseX = currentMouseX;
    });

    document.addEventListener('mousemove', (e) => {
        const currentMouseX = e.clientX;

        if (currentMouseX > 250 && !isLecturebaropen) {
            closeSidebar();
        } else if (currentMouseX > 500 && isLecturebaropen) {
            closeSidebar();
        }
    });

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeSidebar();
    });

    document.getElementById('close-btn').addEventListener('click', function() {
        hideNotification();
    });
    

//_________________________________________________________________________________________________

//Functions
    //Open Side Bar
    function openSidebar() {
        sidebar.classList.add('sidebar-open');
        lectureBars.forEach(lectureBar => lectureBar.classList.add('lecturebar-open'));
        document.querySelector('.main-content').style.marginLeft = '250px';
        blackBoxes.forEach(box => box.classList.add('black-box-move-right'));
        overlays.forEach(overlay => overlay.classList.add('overlay-visible'));
        sideBarClosed = false;
    }
    //Close Side Bar
    function closeSidebar() {
        sidebar.classList.remove('sidebar-open');
        lectureBars.forEach(lectureBar => lectureBar.classList.remove('lecturebar-open'));
        document.querySelector('.main-content').style.marginLeft = '0';
        blackBoxes.forEach(box => box.classList.remove('black-box-move-right')); 
        overlays.forEach(overlay => overlay.classList.remove('overlay-visible'));
        sideBarClosed = true;
    }
    //
    function handleMouseEnter() {
        if (!sideBarClosed){
            lectureBars.forEach(lectureBar => lectureBar.classList.add('lecturebar-extend'));
            isLecturebaropen = true;
            isHoveringLectureButtonOrBar = true;
        }
    }

    function handleMouseLeave(event) {
        isHoveringLectureButtonOrBar = false;
        if (event.clientX < 250) {
            setTimeout(() => {
                if (!isHoveringLectureButtonOrBar) {
                    lectureBars.forEach(lectureBar => lectureBar.classList.remove('lecturebar-extend'));
                    isLecturebaropen = false;
                }
            }, 200); 
        } else {
            if (!isHoveringLectureButtonOrBar || sideBarClosed) {
                lectureBars.forEach(lectureBar => lectureBar.classList.remove('lecturebar-extend'));
                isLecturebaropen = false;
            }
        }
    }

    function showNotification() {
        const notificationBar = document.getElementById('notification-bar');
        notificationBar.style.bottom = '10px';
    }

    function hideNotification() {
        const notificationBar = document.getElementById('notification-bar');
        notificationBar.style.bottom = '-100px';
        sessionStorage.setItem('hasClicked', 'true');
    }

    if (lectureButton) {
        lectureButton.addEventListener('mouseenter', handleMouseEnter);
        lectureButton.addEventListener('mouseleave', handleMouseLeave);
    }

    lectureBars.forEach(lectureBar => {
        lectureBar.addEventListener('mouseenter', handleMouseEnter);
        lectureBar.addEventListener('mouseleave', handleMouseLeave);
    });

    function makeSticky(ids, stickyThreshold, hiddenOffset) {
        ids.forEach(id => {
            var element = document.getElementById(id);
            if (!element) return; // Skip if the element doesn't exist
    
            var scrollPosition = window.pageYOffset;
            var mainCont = document.getElementById('mainContStart')
    
            // Determine when to add 'sticky'
            if (scrollPosition >= stickyThreshold && !element.classList.contains("sticky")) {
                element.classList.add("sticky");
                element.style.position = 'fixed';
                element.style.top = `-${hiddenOffset}px`; // Consistently hide part of the navbar
                mainCont.style.marginTop = '183px'
            } else if (scrollPosition < stickyThreshold && element.classList.contains("sticky")) {
                mainCont.style.marginTop = '0px'
                element.classList.remove("sticky");
                element.style.position = '';
                element.style.top = '';
            }
        });
    }
    
    window.onscroll = function() {
        makeSticky(['navbar'], 200, 100); // Adjust 50px to hide more or less of the navbar
    };
    
    
});

//_________________________________________________________________________________________________