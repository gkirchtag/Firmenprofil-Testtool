let mediaQueries = [
    {
        id: "mq1",
        label: "<576px",
        width: 575,
        icon: "fas fa-mobile-alt",
        headerWidth: "100%"
    },
    {
        id: "mq2",
        label: ">576px",
        width: 576,
        icon: "fas fa-mobile-alt",
        headerWidth: "540px"
    },
    {
        id: "mq3",
        label: ">800",
        width: 800,
        icon: "fas fa-tablet-alt",
        headerWidth: "657.5px"
    },
    {
        id: "mq4",
        label: ">992px",
        width: 992,
        icon: "fas fa-laptop",
        headerWidth: "848.16px"
    },
    {
        id: "mq5",
        label: ">1310px",
        width: 1310,
        icon: "fas fa-desktop",
        headerWidth: "1141.4px"
    }
];

// Create Media Query Buttons and place into media_queries div
let targetDiv = document.getElementById("media_queries")
for (const mq of mediaQueries) {
    mq.element = document.createElement("p");
    mq.element.innerHTML = `<i class="${mq.icon}"></i>${mq.label}`;
    mq.element.id = mq.id;
    mq.element.setAttribute("onClick", "handleMqClick(this)");
    
    targetDiv.append(mq.element);
}



window.addEventListener('resize', windowResize);

const windowWidth = document.querySelector('#windowWidth');
const headerWidth = document.querySelector('#headerWidth');
const wrapper = document.querySelector('#wrapper');
const header = document.querySelector('#header');
const iFrame = document.querySelector('#iFrame');



function resizeIframe() {
    iFrame.style.height = 0;
    iFrame.style.height = iFrame.contentWindow.document.body.scrollHeight + 50 + 'px';

}

function windowResize() {

    // Sets Height of Iframe to remove Scrollbar
    resizeIframe();

    // remove the set width from wrapper and header in Case Mq Button was used
    wrapper.style.width = "";
    header.style.width = "";

    // set class of according Mq Button to "mq_active"
    resetClass()
    let mediaQueriesReversed = [...mediaQueries].reverse();
    let mq = mediaQueriesReversed.find(obj => {
        return obj.width <= window.innerWidth
    })
    if (mq) {
        mq.element.className = "mq_active";
    } else {
        // catches smallest MQ
        mediaQueries[0].element.className = "mq_active"
    }

    // write info in Header
    windowWidth.textContent = window.innerWidth + "px";
    headerWidth.textContent = mq.headerWidth;
    
}

function handleMqClick(btn) {
 
    if (btn.className === "mq_active") {
        windowResize();

    } else {

        var mq = mediaQueries.find(obj => {
            return obj.id === btn.id
        })
    
        resetClass();
        btn.className = "mq_active";
        wrapper.style.width = mq.width + "px";
        header.style.width = mq.headerWidth;
        resizeIframe();

        // write info in Header
        windowWidth.textContent = mq.width + "px";
        headerWidth.textContent = mq.headerWidth;
    }
}

// Removes the active Class from all mq Elements
function resetClass() {
    for (const mq of mediaQueries) {
        mq.element.className = "";
    }
}


// Document ready function

var callback = function(){
    // Handler when the DOM is fully loaded
    windowResize();
  };
  
  if (
      document.readyState === "complete" ||
      (document.readyState !== "loading" && !document.documentElement.doScroll)
  ) {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
