// Global variables
window.topZ = 200; // Increased to be higher than Game Boy (100) and slideshow (101)

let gameboyActive = false;
const gameboyMessages = [
  "✨ Welcome to Zia's cute projects site! ✨",
  "💕 Press the buttons to see more! 💕",
  "🌈 Retro and cute, just like me! 🌈",
  "🎀 Thanks for visiting my page! 🎀",
  "🦄 You're the best for checking this out! 🦄",
  "💖 Have a magical day! 💖",
  "🌟 Sparkles and rainbows! 🌟",
  "🍭 Sweet like candy! 🍭"
];

function initGameBoy() {
  const gameboyConsole = document.getElementById('gameboy-console');
  const gameboyContent = document.getElementById('gameboy-content');
  
  if (!gameboyConsole || !gameboyContent) return;
  
  // Display the gif on the screen instead of messages
  gameboyContent.innerHTML = '<img src="assets/images/kirby.gif" alt="Game animation" style="width: 110%; height: 110%; object-fit: cover;">';
  
  // Add event listeners to Game Boy buttons without sounds or messages
  const buttons = document.querySelectorAll('.btn-a, .btn-b, .dpad-up, .dpad-down, .dpad-left, .dpad-right, .option-start, .option-select');
  buttons.forEach(button => {
    button.addEventListener('click', handleGameboyButtonSilent);
  });
  
  // Make the Game Boy draggable
  makeGameBoyDraggable();
}

// Silent version of button handler (no sounds or messages)
function handleGameboyButtonSilent(e) {
  // Prevent the click from bubbling up to the console
  e.stopPropagation();
  
  // Get the class name of the clicked button
  const buttonClass = e.target.className;
  
  // Execute functions without sounds or messages
  if (buttonClass.includes('option-start')) {
    toggleGameboySilent();
  }
  // Removed option-select handler that showed themes
}

function toggleGameboySilent() {
  gameboyActive = !gameboyActive;
}

// Function to make the Game Boy draggable
function makeGameBoyDraggable() {
  const gameBoy = document.getElementById('gameboy-console');
  if (!gameBoy) return;
  
  // Add a drag handle to the top of the Game Boy
  const dragHandle = document.createElement('div');
  dragHandle.className = 'gameboy-drag-handle';
  dragHandle.innerHTML = '';
  gameBoy.querySelector('.gameboy-body').prepend(dragHandle);
  
  let isDragging = false;
  let offsetX = 0, offsetY = 0;
  
  // When mouse is pressed on the drag handle or screen area
  dragHandle.addEventListener('mousedown', startDrag);
  gameBoy.querySelector('.gameboy-screen').addEventListener('mousedown', startDrag);
  
  function startDrag(e) {
    // Don't start drag if clicking buttons
    if (e.target.closest('.btn-a, .btn-b, .dpad-up, .dpad-down, .dpad-left, .dpad-right, .option-start, .option-select')) {
      return;
    }
    
    isDragging = true;
    
    // Calculate the offset from the pointer to the Game Boy edges
    const rect = gameBoy.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    
    // Remove any existing transform that might interfere with dragging
    gameBoy.style.transform = 'none';
    gameBoy.style.transition = 'none';
    
    // Update z-index to bring Game Boy to front
    gameBoy.style.zIndex = ++window.topZ;
    
    // Update the cursor style
    document.body.style.cursor = 'grabbing';
    
    e.preventDefault();
  }
  
  // When the mouse moves while dragging
  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    
    // Calculate new position
    let left = e.clientX - offsetX;
    let top = e.clientY - offsetY;
    
    // Ensure Game Boy stays within the viewport
    const width = gameBoy.offsetWidth;
    const height = gameBoy.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Constrain horizontally
    if (left < 0) left = 0;
    if (left + width > windowWidth) left = windowWidth - width;
    
    // Constrain vertically
    if (top < 0) top = 0;
    if (top + height > windowHeight) top = windowHeight - height;
    
    // Update Game Boy position
    gameBoy.style.left = left + 'px';
    gameBoy.style.top = top + 'px';
    gameBoy.style.right = 'auto';
    gameBoy.style.bottom = 'auto';
  });
  
  // When mouse is released
  document.addEventListener('mouseup', function() {
    if (!isDragging) return;
    
    isDragging = false;
    
    // Restore animation
    gameBoy.style.transition = 'all 0.3s ease';
    
    // Reset cursor
    document.body.style.cursor = 'default';
  });
  
  // Also handle touch events for mobile devices
  dragHandle.addEventListener('touchstart', handleTouchStart, { passive: false });
  gameBoy.querySelector('.gameboy-screen').addEventListener('touchstart', handleTouchStart, { passive: false });
  
  function handleTouchStart(e) {
    // Don't start drag if touching buttons
    if (e.target.closest('.btn-a, .btn-b, .dpad-up, .dpad-down, .dpad-left, .dpad-right, .option-start, .option-select')) {
      return;
    }
    
    isDragging = true;
    
    const touch = e.touches[0];
    const rect = gameBoy.getBoundingClientRect();
    offsetX = touch.clientX - rect.left;
    offsetY = touch.clientY - rect.top;
    
    // Remove transform and update z-index
    gameBoy.style.transform = 'none';
    gameBoy.style.transition = 'none';
    gameBoy.style.zIndex = ++window.topZ;
    
    e.preventDefault();
  }
  
  document.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    
    // Calculate new position
    let left = touch.clientX - offsetX;
    let top = touch.clientY - offsetY;
    
    // Ensure Game Boy stays within the viewport
    const width = gameBoy.offsetWidth;
    const height = gameBoy.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Constrain horizontally
    if (left < 0) left = 0;
    if (left + width > windowWidth) left = windowWidth - width;
    
    // Constrain vertically
    if (top < 0) top = 0;
    if (top + height > windowHeight) top = windowHeight - height;
    
    // Update Game Boy position
    gameBoy.style.left = left + 'px';
    gameBoy.style.top = top + 'px';
    gameBoy.style.right = 'auto';
    gameBoy.style.bottom = 'auto';
    
    e.preventDefault();
  }, { passive: false });
  
  document.addEventListener('touchend', function() {
    if (!isDragging) return;
    
    isDragging = false;
    
    // Restore animation
    gameBoy.style.transition = 'all 0.3s ease';
  });
}

function handleGameboyButton(e) {
  // Prevent the click from bubbling up to the console
  e.stopPropagation();
  
  // Get the class name of the clicked button
  const buttonClass = e.target.className;
  
  // Show different messages or perform different actions based on which button was clicked
  if (buttonClass.includes('btn-a')) {
    showGameboyMessage("🎮 A button pressed! 🎮<br>Let's play!");
    playGameboySound('a');
  } else if (buttonClass.includes('btn-b')) {
    showGameboyMessage("🎲 B button pressed! 🎲<br>Go back?");
    playGameboySound('b');
  } else if (buttonClass.includes('dpad-up')) {
    showGameboyMessage("⬆️ Going up! ⬆️<br>To the stars!");
    playGameboySound('dpad');
  } else if (buttonClass.includes('dpad-down')) {
    showGameboyMessage("⬇️ Going down! ⬇️<br>To wonderland!");
    playGameboySound('dpad');
  } else if (buttonClass.includes('dpad-left')) {
    showGameboyMessage("⬅️ Going left! ⬅️<br>To the past!");
    playGameboySound('dpad');
  } else if (buttonClass.includes('dpad-right')) {
    showGameboyMessage("➡️ Going right! ➡️<br>To the future!");
    playGameboySound('dpad');
  } else if (buttonClass.includes('option-start')) {
    toggleGameboy();
    playGameboySound('start');
  } else if (buttonClass.includes('option-select')) {
    showGameboyThemes();
    playGameboySound('select');
  }
}

function toggleGameboy() {
  gameboyActive = !gameboyActive;
  
  if (gameboyActive) {
    showGameboyMessage("✨ Game Boy ON! ✨<br>Let's explore!");
    document.getElementById('gameboy-content').style.animation = "pulse 2s infinite";
  } else {
    showGameboyMessage("💤 Game Boy standby 💤<br>Press START again!");
    document.getElementById('gameboy-content').style.animation = "none";
  }
}

function showGameboyThemes() {
  showGameboyMessage("🌈 Theme options: 🌈<br>1. Pink & Purple<br>2. Pastel Rainbow<br>3. Starry Night");
  
  // Create theme color buttons
  setTimeout(() => {
    const content = document.getElementById('gameboy-content');
    content.innerHTML = `
      <div style="display: flex; justify-content: space-around; margin-top: 10px;">
        <div class="theme-dot" onclick="changeTheme('pink')" style="width: 20px; height: 20px; background: linear-gradient(#ffa6e6, #d760bb); border-radius: 50%; cursor: pointer;"></div>
        <div class="theme-dot" onclick="changeTheme('rainbow')" style="width: 20px; height: 20px; background: linear-gradient(90deg, #ffb6e6, #99ccff, #99ffcc); border-radius: 50%; cursor: pointer;"></div>
        <div class="theme-dot" onclick="changeTheme('stars')" style="width: 20px; height: 20px; background: linear-gradient(#2a0074, #5c0099); border-radius: 50%; cursor: pointer;"></div>
      </div>
    `;
  }, 2000);
}

function changeTheme(theme) {
  let background, taskbarBg, windowBg;
  
  switch(theme) {
    case 'pink':
      background = 'linear-gradient(135deg, #ffcef3 0%, #da9eff 100%)';
      taskbarBg = 'linear-gradient(to right, #ffb6e6 0%, #f292e3 100%)';
      windowBg = '#ffd9f7';
      break;
    case 'rainbow':
      background = 'linear-gradient(135deg, #ffd9eb 0%, #bbfff5 100%)';
      taskbarBg = 'linear-gradient(to right, #c8a9ff 0%, #b3ddff 100%)';
      windowBg = '#e8f7ff';
      break;
    case 'stars':
      background = 'linear-gradient(135deg, #1a0040 0%, #5c0099 100%)';
      taskbarBg = 'linear-gradient(to right, #420080 0%, #7b00ad 100%)';
      windowBg = '#300066';
      document.querySelectorAll('.icon').forEach(icon => {
        icon.style.color = '#ffcef3';
        icon.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 0.8)';
      });
      break;
  }
  
  // Don't set background - use CSS instead
  // document.body.style.background = background;
  document.querySelector('.taskbar').style.background = taskbarBg;
  
  // Reset Game Boy content
  setTimeout(() => {
    showGameboyMessage(`✨ Theme changed to ${theme}! ✨<br>Looking cute!`);
  }, 500);
}

function showGameboyMessage(message) {
  const content = document.getElementById('gameboy-content');
  if (!content) return;
  
  content.innerHTML = `<div style="font-family: 'Courier New', monospace; font-size: 12px; color: #306230; line-height: 1.4; text-shadow: 1px 1px 0 rgba(180, 230, 180, 0.5);">${message}</div>`;
}

function cycleGameboyMessage() {
  const randomMessage = gameboyMessages[Math.floor(Math.random() * gameboyMessages.length)];
  showGameboyMessage(randomMessage);
  playGameboySound('click');
}

function playGameboySound(type) {
  let sound;
  
  switch(type) {
    case 'a':
      sound = new Audio('https://www.myinstants.com/media/sounds/sfx-pop.mp3');
      break;
    case 'b':
      sound = new Audio('https://www.myinstants.com/media/sounds/bike-horn.mp3');
      break;
    case 'dpad':
      sound = new Audio('https://www.myinstants.com/media/sounds/click-button.mp3');
      break;
    case 'start':
      sound = new Audio('https://www.myinstants.com/media/sounds/switch-sound-effect.mp3');
      break;
    case 'select':
      sound = new Audio('https://www.myinstants.com/media/sounds/notification-sound-fx-youtubemp3free.org.mp3');
      break;
    case 'click':
      sound = new Audio('https://www.myinstants.com/media/sounds/click.mp3');
      break;
    default:
      return;
  }
  
  sound.volume = 0.3;
  sound.play().catch(err => console.log('Audio play failed:', err));
}

// Paint functionality
let paintCanvas;
let paintCtx;
let paintTool = 'pencil';
let paintColor = '#FF80CC'; // Updated to cute pink default
let paintLineWidth = 1;
let isPainting = false;
let lastX = 0;
let lastY = 0;
let startX = 0;
let startY = 0;
let cuteStamps = ['🦄', '🌈', '🍭', '🌸', '✨', '💖', '🐱', '🍓', '🌟', '🧁'];
let currentStamp = 0;
let stampSize = 36;

// Window management
function toggleWindow(id, event) {
  const el = document.getElementById(id);
  const isVisible = el.style.display === "block";
  el.style.display = isVisible ? "none" : "block";

  if (!isVisible) {
    // Position the window
    if (id === "resumeWindow" || id === "terminalWindow" || id === "paintWindow" || id === "ieWindow") {
      // Center these windows
      positionWindowCentered(el);
      
      // If terminal is being opened, focus the input field
      if (id === "terminalWindow") {
        setTimeout(() => {
          const input = document.getElementById("terminal-input");
          if (input) input.focus();
        }, 100);
      }
      
      // If paint is being opened, initialize it
      if (id === "paintWindow") {
        setTimeout(initPaint, 100);
      }
      
      // If resume window is being opened, fix its display
      if (id === "resumeWindow") {
        setTimeout(fixResumeDisplay, 100);
      }
    } else if (event) {
      // Position window relative to clicked icon
      positionWindowFromEvent(el, event);
    } else {
      // Default centered position for windows opened programmatically
      positionWindowCentered(el);
    }
    
    // Ensure the window is fully in view
    ensureWindowInView(el);
  }

  // Set very high z-index for resume window, otherwise use regular z-index increment
  if (id === 'resumeWindow') {
    window.topZ = Math.max(window.topZ || 200, 9000); // Ensure topZ is at least 9000
    el.style.zIndex = 9999; // Very high z-index for resume
  } else {
    // Ensure topZ is at least 200 (higher than Game Boy at 100 and slideshow at 101)
    window.topZ = Math.max(window.topZ || 200, 200);
    el.style.zIndex = ++window.topZ;
  }
  
  // Hide start menu when opening windows
  const startMenu = document.getElementById("startMenu");
  if (startMenu) {
    startMenu.style.display = "none";
  }
}

// Helper function to position window centered
function positionWindowCentered(el) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Use percentages for small screens
  if (viewportWidth < 768) {
    el.style.width = `${Math.min(90, Math.floor(el.offsetWidth / viewportWidth * 100))}vw`;
    el.style.left = `5vw`;
    el.style.top = `10vh`;
  } else {
    // Traditional centering for larger screens
    el.style.left = `calc(50% - ${el.offsetWidth / 2}px)`;
    el.style.top = `calc(50% - ${el.offsetHeight / 2}px)`;
  }
}

// Helper function to position window from click event
function positionWindowFromEvent(el, event) {
  const rect = event.currentTarget.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // On mobile, position windows in the center
  if (viewportWidth < 768) {
    positionWindowCentered(el);
    return;
  }
  
  // Initial position based on click
  let left = rect.left;
  let top = rect.bottom + 10;
  
  // Ensure window is fully visible (not outside screen)
  // Adjust horizontal position if needed
  if (left + el.offsetWidth > viewportWidth) {
    left = Math.max(0, viewportWidth - el.offsetWidth - 10);
  }
  
  // Adjust vertical position if needed
  if (top + el.offsetHeight > viewportHeight) {
    // If window would be outside bottom of screen,
    // try to position it above the clicked element instead
    const topPosition = rect.top - el.offsetHeight - 10;
    
    if (topPosition > 0) {
      // There's room above
      top = topPosition;
    } else {
      // Not enough room above either, so position at top of screen with small margin
      top = 10;
    }
  }
  
  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
}

// Helper function to ensure window is fully in viewport
function ensureWindowInView(windowEl) {
  // Get window dimensions and position
  const rect = windowEl.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  let left = parseInt(windowEl.style.left) || rect.left;
  let top = parseInt(windowEl.style.top) || rect.top;
  
  // Check right edge
  if (rect.right > viewportWidth) {
    left = Math.max(0, viewportWidth - rect.width - 10);
  }
  
  // Check left edge
  if (rect.left < 0) {
    left = 10;
  }
  
  // Check bottom edge
  if (rect.bottom > viewportHeight) {
    top = Math.max(0, viewportHeight - rect.height - 10);
  }
  
  // Check top edge
  if (rect.top < 0) {
    top = 10;
  }
  
  // Apply fixed position
  windowEl.style.left = `${left}px`;
  windowEl.style.top = `${top}px`;
}

// Function to fix the resume window display
function fixResumeDisplay() {
  const resumeWindow = document.getElementById('resumeWindow');
  if (!resumeWindow) return;
  
  // Set window to auto height to fit all content without scrolling
  resumeWindow.style.height = 'auto';
  resumeWindow.style.maxHeight = 'none';
  
  // Remove scrolling from window-body
  const windowBody = resumeWindow.querySelector('.window-body');
  if (windowBody) {
    windowBody.style.height = 'auto';
    windowBody.style.overflowY = 'visible';
    windowBody.style.padding = '10px';
  }
  
  // Fix skill boxes to use the same height
  const skillBoxes = resumeWindow.querySelectorAll('.window-body > div:nth-child(4) > div:first-child > div > div');
  if (skillBoxes.length > 0) {
    // First set all to auto height to determine natural height
    skillBoxes.forEach(box => {
      box.style.height = 'auto';
    });
    
    // Calculate maximum height needed
    let maxHeight = 0;
    skillBoxes.forEach(box => {
      const height = box.scrollHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }
    });
    
    // Apply the same height to all boxes (adding some padding)
    const finalHeight = maxHeight + 10;
    skillBoxes.forEach(box => {
      box.style.height = finalHeight + 'px';
      box.style.boxSizing = 'border-box';
      box.style.overflow = 'hidden';
    });
  }
}

// Start menu functionality
const startMessages = [
  "Oops! The Start menu is on vacation.",
  "You clicked Start, but nothing started.",
  "Start? More like... stall.",
  "404: Start menu not found.",
  "Please insert floppy disk to continue.",
  "This button does absolutely nothing. Happy clicking!",
  "The Start menu went out for snacks. Be back never."
];

function toggleStartMenu() {
  const message = startMessages[Math.floor(Math.random() * startMessages.length)];
  showContextWindow("Start Menu", message);
}

// Event listeners for hiding start menu when clicking elsewhere
window.addEventListener("click", function (e) {
  const startMenu = document.getElementById("startMenu");
  if (startMenu && !e.target.closest(".start-button") && !e.target.closest(".start-menu")) {
    startMenu.style.display = "none";
  }
});

// Make windows draggable
function makeDraggable(id) {
  const el = document.getElementById(id);
  if (!el) return;
  
  const bar = el.querySelector('.title-bar');
  let offsetX = 0, offsetY = 0, isDragging = false;

  bar.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    el.style.zIndex = ++window.topZ;
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      // Calculate new position
      let left = e.clientX - offsetX;
      let top = e.clientY - offsetY;
      
      // Ensure window stays in viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Prevent dragging beyond right edge
      if (left + el.offsetWidth > viewportWidth) {
        left = viewportWidth - el.offsetWidth;
      }
      
      // Prevent dragging beyond left edge
      if (left < 0) {
        left = 0;
      }
      
      // Prevent dragging beyond bottom edge
      if (top + el.offsetHeight > viewportHeight) {
        top = viewportHeight - el.offsetHeight;
      }
      
      // Prevent dragging beyond top edge
      if (top < 0) {
        top = 0;
      }
      
      // Apply position
      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
    }
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

// Context Menu
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  const menu = document.getElementById("contextMenu");
  menu.style.top = `${e.clientY}px`;
  menu.style.left = `${e.clientX}px`;
  menu.style.display = "block";
});

document.addEventListener("click", () => {
  document.getElementById("contextMenu").style.display = "none";
});

// Sticky note error
function showStickyError() {
  const popup = document.getElementById('stickyErrorWindow');
  popup.style.display = 'block';
  popup.style.zIndex = ++window.topZ;
}

function hideStickyError() {
  document.getElementById('stickyErrorWindow').style.display = 'none';
}

// Context popup window
function showContextWindow(title, message) {
  const win = document.getElementById("contextPopupWindow");
  const winTitle = win.querySelector(".title-bar-text");
  const winBody = win.querySelector(".window-body p");
  winTitle.textContent = title;
  winBody.textContent = message;
  win.style.display = "block";
  win.style.zIndex = ++window.topZ;
}

function hideContextWindow() {
  document.getElementById("contextPopupWindow").style.display = "none";
}

// Funny error messages for Windows 98 Explorer
function showFunnyMessage(item) {
  let title = 'Error';
  let message = '';
  
  switch(item) {
    case 'mycomputer':
      title = 'My Computer';
      message = 'This computer exists in 1998. Your files are stored on 3.5-inch floppy disks and you have 8MB of RAM. Please lower your expectations accordingly.';
      break;
    case 'drivec':
      title = 'Disk Error';
      message = 'Drive C: contains 27 viruses, 118 broken shortcuts, and a digital pet from 1997 that is very hungry. Access denied for your own good.';
      break;
    case 'drived':
      title = 'Hardware Error';
      message = 'Drive D: is actually a CD-ROM with "Best of Windows 98 Startup Sounds" inside. Please insert a different CD to proceed.';
      break;
    case 'homework':
      title = 'Homework Folder';
      message = 'It is just homework, I swear!';
      break;
    case 'network':
      title = 'Connection Error';
      message = 'Network connection failed. Please check your 56k modem and make sure nobody is using the telephone. Estimated download time: 7 days, 3 hours.';
      break;
    default:
      message = 'An unexpected error has occurred because that\'s what Windows 98 does best.';
  }
  
  // Show custom Windows 98 error popup
  const win = document.getElementById("contextPopupWindow");
  const winTitle = win.querySelector(".title-bar-text");
  const winBody = win.querySelector(".window-body p");
  winTitle.textContent = title;
  winBody.textContent = message;
  win.style.display = "block";
  win.style.zIndex = ++window.topZ;
}

// Projects navigation and content
let currentProjectsView = 0;
const projectsViews = [
  // View 0: Main projects with folders
  `<div style="display: flex; gap: 30px; margin-top: 20px; padding: 15px; position: relative;">
     <div class="portfolio-folder" onclick="setProjectsView(1)">
       <img src="assets/icons/files.png" alt="Folder">
       <div>Data Analytics</div>
     </div>
     <div class="portfolio-folder" onclick="setProjectsView(2)">
       <img src="assets/icons/files.png" alt="Folder">
       <div>AI & ML</div>
     </div>
   </div>`,
  
  // View 1: Data Analytics folder contents
  `<div style="display: flex; align-items: center; margin-bottom: 15px;">
     <img src="assets/icons/files.png" style="width: 24px; height: 24px; margin-right: 8px;">
     <span style="font-weight: bold; color: #d44bbd;">Data Analytics Projects</span>
   </div>
   <div style="display: flex; flex-wrap: wrap; gap: 15px; padding: 10px; position: relative;">
     <div class="portfolio-file" onclick="window.open('https://github.com/tasnimzia/netflix-dashboard', '_blank')">
       <img src="https://win98icons.alexmeub.com/icons/png/html-0.png" alt="HTML File">
       <div>Netflix Dashboard</div>
     </div>
     <div class="portfolio-file" onclick="window.open('https://github.com/tasnimzia/spotify-analysis', '_blank')">
       <img src="https://win98icons.alexmeub.com/icons/png/html-0.png" alt="HTML File">
       <div>Spotify Analysis</div>
     </div>
     <div class="portfolio-file" onclick="window.open('https://github.com/tasnimzia/covid-dashboard', '_blank')">
       <img src="https://win98icons.alexmeub.com/icons/png/html-0.png" alt="HTML File">
       <div>COVID-19 Analysis</div>
     </div>
   </div>`,
  
  // View 2: AI & ML folder contents
  `<div style="display: flex; align-items: center; margin-bottom: 15px;">
     <img src="assets/icons/files.png" style="width: 24px; height: 24px; margin-right: 8px;">
     <span style="font-weight: bold; color: #d44bbd;">AI & ML Projects</span>
   </div>
   <div style="display: flex; flex-wrap: wrap; gap: 15px; padding: 10px; position: relative;">
     <div class="portfolio-file" onclick="window.open('https://github.com/tasnimzia/sentiment-analysis', '_blank')">
       <img src="https://win98icons.alexmeub.com/icons/png/html-0.png" alt="HTML File">
       <div>Sentiment Analysis</div>
     </div>
     <div class="portfolio-file" onclick="window.open('https://github.com/tasnimzia/image-classification', '_blank')">
       <img src="https://win98icons.alexmeub.com/icons/png/html-0.png" alt="HTML File">
       <div>Image Classification</div>
     </div>
     <div class="portfolio-file" onclick="window.open('https://github.com/tasnimzia/nlp-chatbot', '_blank')">
       <img src="https://win98icons.alexmeub.com/icons/png/html-0.png" alt="HTML File">
       <div>NLP Chatbot</div>
     </div>
   </div>`
];

// Function to set the portfolio view
function setProjectsView(viewIndex) {
  document.getElementById('portfolioContent').innerHTML = projectsViews[viewIndex];
  currentProjectsView = viewIndex;
  
  // Update folder tree highlight
  const treeItems = document.querySelectorAll('.tree-item');
  treeItems.forEach(item => item.classList.remove('active'));
  
  // Add active class to current tree item
  if (viewIndex === 0) {
    document.querySelector('.tree-item.tree-open-folder').classList.add('active');
  } else if (viewIndex === 1) {
    document.querySelectorAll('.tree-item.tree-folder')[2].classList.add('active');
  } else if (viewIndex === 2) {
    document.querySelectorAll('.tree-item.tree-folder')[3].classList.add('active');
  }
}

// Navigation functions for Projects window
function goBack() {
  if (currentProjectsView > 0) {
    setProjectsView(currentProjectsView - 1);
  }
}

function goForward() {
  if (currentProjectsView < projectsViews.length - 1) {
    setProjectsView(currentProjectsView + 1);
  }
}

// Terminal functionality
function handleTerminalInput(event) {
  if (event.key === 'Enter') {
    const input = event.target.value.trim();
    if (input) {
      executeCommand(input);
      event.target.value = '';
    }
  }
}

function executeCommand(command) {
  const terminal = document.getElementById('terminal-output');
  const lowerCommand = command.toLowerCase();
  
  // Add the command to the terminal
  terminal.innerHTML = terminal.innerHTML.replace(/<span class="blinking-cursor">_<\/span>/, '');
  terminal.innerHTML += `${command}\n`;
  
  // Process command - Easter Eggs!
  if (lowerCommand === 'help' || lowerCommand === '/?') {
    terminal.innerHTML += `
Available commands:
  dir           - List secret files
  secret        - Find hidden easter eggs
  joke          - Tell a nerdy joke
  hack          - Pretend to hack something
  matrix        - Enter the Matrix
  coffee        - Make coffee
  dance         - Do a little dance
  whatif        - Ask a silly question
  cls           - Clear screen
  help          - Show this help
`;
  } else if (lowerCommand === 'cls') {
    terminal.innerHTML = `Microsoft(R) Windows 98
(C)Copyright Microsoft Corp 1981-1998.

C:\\FUNSTUFF>`;
  } else if (lowerCommand === 'secret') {
    terminal.innerHTML += `
Congratulations! You found the secret command.
Here's a secret: The cake is a lie, but the cookies are real.
`;
  } else if (lowerCommand === 'joke') {
    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs.",
      "Why do programmers always mix up Christmas and Halloween? Because Oct 31 = Dec 25.",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
      "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
      "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
      "Why did the developer go broke? Because he used up all his cache."
    ];
    terminal.innerHTML += `\n${jokes[Math.floor(Math.random() * jokes.length)]}\n`;
  } else if (lowerCommand === 'hack') {
    terminal.innerHTML += `
INITIATING HACK SEQUENCE...
Accessing mainframe...
Bypassing firewall...
Downloading files...
Planting backdoor...
Erasing tracks...
HACK COMPLETE!
Just kidding, this is just a harmless animation. No actual hacking occurred.
`;
  } else if (lowerCommand === 'matrix') {
    terminal.innerHTML += `
Wake up, Neo...
The Matrix has you...
Follow the white rabbit.
Knock, knock, Neo.

System Failure: Unable to disconnect from reality. Matrix mode unavailable.
`;
  } else if (lowerCommand === 'coffee') {
    terminal.innerHTML += `
     (
      )
   c[]
   
Error: Coffee machine not found.
Please insert coffee module in Drive A:
`;
  } else if (lowerCommand === 'dance') {
    terminal.innerHTML += `
   (•_•)
   <)   )╯
    /    \\
   
   \\(•_•)
    (   (>
    /    \\
   
   (•_•)
   <)   )>
    /    \\
`;
  } else if (lowerCommand === 'whatif') {
    const responses = [
      "What if computers had feelings? Would deleting files be considered murder?",
      "What if your reflection is actually your evil twin plotting against you?",
      "What if your keyboard is secretly judging your typing skills?",
      "What if all error messages are just computers screaming for help?",
      "What if ctrl+z worked in real life?"
    ];
    terminal.innerHTML += `\n${responses[Math.floor(Math.random() * responses.length)]}\n`;
  } else if (lowerCommand === 'dir') {
    terminal.innerHTML += `
Directory of C:\\FUNSTUFF

.              <DIR>        10-05-25  4:20p .
..             <DIR>        10-05-25  4:20p ..
SECRETS   EXE      6,969    10-05-25  4:20p secrets.exe
JOKE      TXT      4,042    10-05-25  4:20p joke.txt
DANCE     COM      1,337    10-05-25  4:20p dance.com
HACK      BAT        404    10-05-25  4:20p hack.bat
MATRIX    SYS     90,210    10-05-25  4:20p matrix.sys
COFFEE    JAR        418    10-05-25  4:20p coffee.jar
WHATIF    ???      8,086    10-05-25  4:20p whatif.???
`;
  } else {
    terminal.innerHTML += `Bad command or file name.
Type HELP for list of fun commands.`;
  }
  
  // Add blinking cursor at the end
  terminal.innerHTML += `\nC:\\FUNSTUFF><span class="blinking-cursor">_</span>`;
  
  // Scroll to bottom with a small delay to ensure content is rendered
  setTimeout(() => {
    terminal.scrollTop = terminal.scrollHeight;
  }, 10);
  
  // Force focus back to the input
  document.getElementById('terminal-input').focus();
}

// Initialize draggable windows on load
document.addEventListener('DOMContentLoaded', function() {
  // Comment out background setting - we'll use CSS instead
  // document.body.style.backgroundImage = "url('assets/images/clouds.png')";
  
  // Initialize Game Boy
  initGameBoy();
  
  // Initialize Music Player
  initMusicPlayer();
  
  // Initialize Taskbar Cat
  initTaskbarCat();
  
  // Initialize Slideshow
  initSlideshow();
  
  // Ensure track info is visible (add this as a safety)
  setTimeout(() => {
    const trackInfo = document.getElementById('track-info');
    if (trackInfo) {
      trackInfo.style.display = 'block';
      const nowPlaying = trackInfo.closest('.now-playing');
      if (nowPlaying) {
        nowPlaying.style.display = 'flex';
      }
      updateTrackInfo(); // Call it again to make sure
    }
  }, 500);
  
  // Make all windows draggable
  const allWindows = document.querySelectorAll('.window');
  allWindows.forEach(w => makeDraggable(w.id));
  
  // Special windows
  makeDraggable('stickyNoteWindow');
  makeDraggable('stickyErrorWindow');
  
  // Initialize portfolio content
  updateProjectsContent();
  
  // Play boot sound
  const bootSound = document.getElementById('bootSound');
  if (bootSound) {
    bootSound.volume = 0.5; // Lower volume
  }
  
  // Add click handler to terminal output to focus input
  const terminalOutput = document.getElementById('terminal-output');
  if (terminalOutput) {
    terminalOutput.addEventListener('click', () => {
      const input = document.getElementById('terminal-input');
      if (input) input.focus();
    });
  }
  
  // Add some CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.7; }
      100% { opacity: 1; }
    }
    
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    
    #gameboy-console {
      animation: float 5s ease-in-out infinite;
    }
    
    .icon:hover {
      transform: scale(1.1);
      transition: transform 0.2s ease;
    }
    
    .icon:active {
      transform: scale(0.95);
    }
  `;
  document.head.appendChild(style);
});

// Function to initialize the taskbar cat
function initTaskbarCat() {
  const taskbarCat = document.getElementById('taskbar-cat');
  if (!taskbarCat) return;
  
  // Add click interaction only
  taskbarCat.addEventListener('click', () => {
    taskbarCat.style.animation = 'catJump 0.3s ease';
    setTimeout(() => {
      taskbarCat.style.animation = '';
    }, 300);
  });
  
  // Add jump animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes catJump {
      0% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}

// Internet Explorer functionality
function switchIETab(tab) {
  // Get tab elements
  const githubTab = document.getElementById('github-tab');
  const linkedinTab = document.getElementById('linkedin-tab');
  const blogsTab = document.getElementById('blogs-tab');
  
  // Get content elements
  const githubContent = document.getElementById('github-content');
  const linkedinContent = document.getElementById('linkedin-content');
  const blogsContent = document.getElementById('blogs-content');
  
  // Get address bar and status
  const addressBar = document.getElementById('ie-address-bar');
  const statusBar = document.getElementById('ie-status');
  
  // Reset all tabs
  githubTab.classList.remove('active-tab');
  linkedinTab.classList.remove('active-tab');
  blogsTab.classList.remove('active-tab');
  githubTab.style.background = '#ddd';
  linkedinTab.style.background = '#ddd';
  blogsTab.style.background = '#ddd';
  
  // Hide all content
  githubContent.style.display = 'none';
  linkedinContent.style.display = 'none';
  blogsContent.style.display = 'none';
  
  // Set active tab and show content
  if (tab === 'github') {
    githubTab.classList.add('active-tab');
    githubTab.style.background = 'white';
    githubContent.style.display = 'block';
    addressBar.value = 'https://github.com/ZiaBytesCookies';
    statusBar.textContent = 'https://github.com/ZiaBytesCookies';
  } else if (tab === 'linkedin') {
    linkedinTab.classList.add('active-tab');
    linkedinTab.style.background = 'white';
    linkedinContent.style.display = 'block';
    addressBar.value = 'https://www.linkedin.com/in/tasnim-zia-proma/';
    statusBar.textContent = 'https://www.linkedin.com/in/tasnim-zia-proma/';
  } else if (tab === 'blogs') {
    blogsTab.classList.add('active-tab');
    blogsTab.style.background = 'white';
    blogsContent.style.display = 'block';
    addressBar.value = 'https://blogs.ziacookies.com/';
    statusBar.textContent = 'https://blogs.ziacookies.com/';
  }
}

function navigateIE(action) {
  // Handle navigation actions
  if (action === 'refresh') {
    // Simulate refresh with a small animation
    const activeContent = document.querySelector('.ie-content[style*="display: block"]');
    if (activeContent) {
      activeContent.style.opacity = '0.5';
      setTimeout(() => {
        activeContent.style.opacity = '1';
      }, 300);
    }
  }
  // For back/forward, we could implement a history stack if needed
}

// Initialize paint canvas on window open
function initPaint() {
  paintCanvas = document.getElementById('paint-canvas');
  if (!paintCanvas) return;
  
  paintCtx = paintCanvas.getContext('2d');
  
  // Set canvas size
  resizePaintCanvas();
  
  // Add event listeners
  paintCanvas.addEventListener('mousedown', startPainting);
  paintCanvas.addEventListener('mousemove', paint);
  paintCanvas.addEventListener('mouseup', stopPainting);
  paintCanvas.addEventListener('mouseleave', stopPainting);
  paintCanvas.addEventListener('mousemove', updateCoordinates);
  
  // Select default tool
  selectPaintTool('pencil');
  setPaintLineWidth(3); // Increased default size
  
  // Create cute brushes and stamps toolbar
  createCutePaintTools();
  
  // Add window resize event to handle canvas resizing
  window.addEventListener('resize', function() {
    if (document.getElementById('paintWindow').style.display === 'block') {
      resizePaintCanvas();
    }
  });
  
  // Add cute background pattern
  addCuteCanvasBackground();
  
  // Hide the old color palette
  const oldColorPalette = document.querySelector('.paint-colors');
  if (oldColorPalette) {
    oldColorPalette.style.display = 'none';
  }
}

function createCutePaintTools() {
  // Get the toolbar
  const toolbar = document.querySelector('.paint-toolbar div');
  if (!toolbar) return;
  
  // Clear existing tools
  toolbar.innerHTML = '';
  
  // Add cute brushes
  const brushTools = [
    { name: 'pencil', icon: '✏️', tooltip: 'Pencil' },
    { name: 'brush', icon: '🖌️', tooltip: 'Brush' },
    { name: 'heart', icon: '💕', tooltip: 'Heart Brush' },
    { name: 'star', icon: '⭐', tooltip: 'Star Brush' },
    { name: 'eraser', icon: '🧽', tooltip: 'Eraser' },
    { name: 'rainbow', icon: '🌈', tooltip: 'Rainbow Brush' },
    { name: 'glitter', icon: '✨', tooltip: 'Glitter' }
  ];
  
  // Create a horizontal toolbar wrapper
  const toolbarWrapper = document.createElement('div');
  toolbarWrapper.style.display = 'flex';
  toolbarWrapper.style.flexWrap = 'wrap';
  toolbarWrapper.style.alignItems = 'center';
  toolbarWrapper.style.width = '100%';

  // Add tools section
  const toolsSection = document.createElement('div');
  toolsSection.style.display = 'flex';
  toolsSection.style.marginRight = '10px';
  
  brushTools.forEach(tool => {
    const toolButton = document.createElement('div');
    toolButton.className = 'paint-tool';
    toolButton.setAttribute('data-tool', tool.name);
    toolButton.setAttribute('title', tool.tooltip);
    toolButton.innerHTML = `<span style="font-size: 18px;">${tool.icon}</span>`;
    toolButton.style.width = '32px';
    toolButton.style.height = '32px';
    toolButton.style.margin = '3px';
    toolButton.style.borderRadius = '4px';
    toolButton.style.display = 'flex';
    toolButton.style.alignItems = 'center';
    toolButton.style.justifyContent = 'center';
    toolButton.style.cursor = 'pointer';
    toolButton.style.background = '#ffd9f7';
    toolButton.style.border = '1px solid #e980cd';
    toolButton.style.boxShadow = '1px 1px 2px rgba(120, 0, 120, 0.2)';
    
    toolButton.onclick = () => selectPaintTool(tool.name);
    toolsSection.appendChild(toolButton);
  });
  
  toolbarWrapper.appendChild(toolsSection);
  
  // Add a vertical separator
  const separator = document.createElement('div');
  separator.style.width = '1px';
  separator.style.height = '32px';
  separator.style.background = '#e980cd';
  separator.style.margin = '0 8px';
  toolbarWrapper.appendChild(separator);
  
  // Add all stamps in a horizontal row
  const stampsSection = document.createElement('div');
  stampsSection.style.display = 'flex';
  stampsSection.style.alignItems = 'center';
  stampsSection.style.marginRight = '8px';
  
  // Create label for stamps
  const stampLabel = document.createElement('div');
  stampLabel.textContent = 'Stamps:';
  stampLabel.style.fontSize = '12px';
  stampLabel.style.marginRight = '5px';
  stampLabel.style.color = '#720070';
  stampsSection.appendChild(stampLabel);
  
  // Add each stamp as a button
  cuteStamps.forEach((stamp, index) => {
    const stampButton = document.createElement('div');
    stampButton.className = 'stamp-button';
    stampButton.setAttribute('data-stamp-index', index);
    stampButton.innerHTML = `<span style="font-size: 18px;">${stamp}</span>`;
    stampButton.style.width = '28px';
    stampButton.style.height = '28px';
    stampButton.style.margin = '2px';
    stampButton.style.borderRadius = '4px';
    stampButton.style.display = 'flex';
    stampButton.style.alignItems = 'center';
    stampButton.style.justifyContent = 'center';
    stampButton.style.cursor = 'pointer';
    stampButton.style.background = '#ffd9f7';
    stampButton.style.border = '1px solid #e980cd';
    stampButton.style.boxShadow = '1px 1px 2px rgba(120, 0, 120, 0.2)';
    
    stampButton.onclick = () => {
      selectPaintTool('stamp');
      currentStamp = index;
      
      // Update selected stamp indicator
      document.querySelectorAll('.stamp-button').forEach(btn => {
        btn.style.background = '#ffd9f7';
        btn.style.transform = 'scale(1)';
      });
      stampButton.style.background = '#e980cd';
      stampButton.style.transform = 'scale(1.1)';
      
      // Update cursor
      paintCanvas.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\'><text y=\'19\' font-size=\'16\'>' + stamp + '</text></svg>"), auto';
    };
    
    stampsSection.appendChild(stampButton);
  });
  
  toolbarWrapper.appendChild(stampsSection);
  
  // Add vertical separator before size controls
  const separator2 = document.createElement('div');
  separator2.style.width = '1px';
  separator2.style.height = '32px';
  separator2.style.background = '#e980cd';
  separator2.style.margin = '0 8px';
  toolbarWrapper.appendChild(separator2);
  
  // Add size selector
  const sizeSection = document.createElement('div');
  sizeSection.style.display = 'flex';
  sizeSection.style.alignItems = 'center';
  
  // Create label for sizes
  const sizeLabel = document.createElement('div');
  sizeLabel.textContent = 'Size:';
  sizeLabel.style.fontSize = '12px';
  sizeLabel.style.marginRight = '5px';
  sizeLabel.style.color = '#720070';
  sizeSection.appendChild(sizeLabel);
  
  const sizes = [2, 5, 10, 15];
  sizes.forEach(size => {
    const sizeBtn = document.createElement('div');
    sizeBtn.className = 'size-btn';
    sizeBtn.style.width = `${size * 1.5 + 10}px`;
    sizeBtn.style.height = `${size * 1.5 + 10}px`;
    sizeBtn.style.borderRadius = '50%';
    sizeBtn.style.background = '#e980cd';
    sizeBtn.style.margin = '3px';
    sizeBtn.style.cursor = 'pointer';
    sizeBtn.style.boxShadow = '1px 1px 2px rgba(120, 0, 120, 0.2)';
    sizeBtn.onclick = () => setPaintLineWidth(size);
    sizeSection.appendChild(sizeBtn);
  });
  
  toolbarWrapper.appendChild(sizeSection);
  
  // Add another vertical separator
  const separator3 = document.createElement('div');
  separator3.style.width = '1px';
  separator3.style.height = '32px';
  separator3.style.background = '#e980cd';
  separator3.style.margin = '0 8px';
  toolbarWrapper.appendChild(separator3);
  
  // Add colors section with label
  const colorsSection = document.createElement('div');
  colorsSection.style.display = 'flex';
  colorsSection.style.alignItems = 'center';
  colorsSection.style.flexWrap = 'nowrap';
  
  // Create label for colors
  const colorLabel = document.createElement('div');
  colorLabel.textContent = 'Colors:';
  colorLabel.style.fontSize = '12px';
  colorLabel.style.marginRight = '5px';
  colorLabel.style.color = '#720070';
  colorsSection.appendChild(colorLabel);
  
  // Add the cute pastel colors - use a more limited set to fit horizontally
  const cuteColors = [
    '#FF80CC', '#FFB6D9', '#FF99AC', // Pink hues
    '#C3A6FF', '#A0C4FF', // Purple/blue hues
    '#B8F7D4', '#90F2E0', // Mint/green hues
    '#FDFFAB', '#FFCB69', // Yellow/orange hues
    '#FFFFFF', '#000000' // White and black
  ];
  
  // Create color swatches row
  const colorsRow = document.createElement('div');
  colorsRow.style.display = 'flex';
  colorsRow.style.flexWrap = 'nowrap';
  
  cuteColors.forEach(color => {
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    swatch.style.width = '16px';
    swatch.style.height = '16px';
    swatch.style.background = color;
    swatch.style.border = '1px solid #333';
    swatch.style.cursor = 'pointer';
    swatch.style.borderRadius = '4px';
    swatch.style.margin = '2px';
    swatch.onclick = () => setPaintColor(color);
    colorsRow.appendChild(swatch);
  });
  
  colorsSection.appendChild(colorsRow);
  toolbarWrapper.appendChild(colorsSection);
  
  // Add the toolbar wrapper to the main toolbar
  toolbar.appendChild(toolbarWrapper);
}

function updateColorPalette() {
  const colorPaletteDiv = document.querySelector('.paint-colors div');
  if (!colorPaletteDiv) return;
  
  colorPaletteDiv.innerHTML = '';
  
  // Cute pastel colors
  const cuteColors = [
    '#FF80CC', '#FFB6D9', '#FF99AC', '#FF6B8B', // Pink hues
    '#C3A6FF', '#BDB2FF', '#A0C4FF', '#86C7F0', // Purple/blue hues
    '#B8F7D4', '#ADEDD9', '#CAF7E3', '#90F2E0', // Mint/green hues
    '#FDFFAB', '#FFF6BD', '#FFE08C', '#FFCB69', // Yellow/orange hues
    '#FFFFFF', '#F7F7F7', '#E0E0E0', '#AAAAAA', // White/gray
    '#000000', '#552288', '#994488', '#DD4499'  // Dark colors
  ];
  
  cuteColors.forEach(color => {
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    swatch.style.width = '20px';
    swatch.style.height = '20px';
    swatch.style.background = color;
    swatch.style.border = '1px solid #333';
    swatch.style.cursor = 'pointer';
    swatch.style.borderRadius = '4px';
    swatch.onclick = () => setPaintColor(color);
    colorPaletteDiv.appendChild(swatch);
  });
}

function addCuteCanvasBackground() {
  if (!paintCanvas || !paintCtx) return;
  
  // Add a subtle pattern or border
  paintCtx.fillStyle = '#fff8fc';
  paintCtx.fillRect(0, 0, paintCanvas.width, paintCanvas.height);
  
  // Add subtle polka dots
  paintCtx.fillStyle = 'rgba(255, 182, 233, 0.2)';
  for (let x = 10; x < paintCanvas.width; x += 25) {
    for (let y = 10; y < paintCanvas.height; y += 25) {
      paintCtx.beginPath();
      paintCtx.arc(x, y, 2, 0, Math.PI * 2);
      paintCtx.fill();
    }
  }
}

function resizePaintCanvas() {
  const container = paintCanvas.parentElement;
  const canvasWidth = Math.min(640, container.clientWidth - 10);
  const canvasHeight = Math.min(480, container.clientHeight - 10);
  
  paintCanvas.width = canvasWidth;
  paintCanvas.height = canvasHeight;
  
  // Update status bar
  document.getElementById('paint-canvas-size').textContent = `${canvasWidth} x ${canvasHeight} px`;
  
  // Add cute background
  addCuteCanvasBackground();
}

function selectPaintTool(tool) {
  // Remove highlight from all tools
  document.querySelectorAll('.paint-tool').forEach(el => {
    el.style.background = '#ffd9f7';
  });
  
  // Highlight selected tool
  const toolElement = document.querySelector(`.paint-tool[data-tool="${tool}"]`);
  if (toolElement) {
    toolElement.style.background = '#e980cd';
  }
  
  paintTool = tool;
  
  // Change cursor based on tool
  switch(tool) {
    case 'pencil':
      paintCanvas.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\'><text y=\'19\' font-size=\'16\'>✏️</text></svg>"), auto';
      break;
    case 'brush':
      paintCanvas.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\'><text y=\'19\' font-size=\'16\'>🖌️</text></svg>"), auto';
      break;
    case 'heart':
      paintCanvas.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\'><text y=\'19\' font-size=\'16\'>💕</text></svg>"), auto';
      break;
    case 'star':
      paintCanvas.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\'><text y=\'19\' font-size=\'16\'>⭐</text></svg>"), auto';
      break;
    case 'eraser':
      paintCanvas.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\'><text y=\'19\' font-size=\'16\'>🧽</text></svg>"), auto';
      break;
    case 'stamp':
      // Use the currently selected stamp
      paintCanvas.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\'><text y=\'19\' font-size=\'16\'>' + cuteStamps[currentStamp] + '</text></svg>"), auto';
      break;
    case 'rainbow':
      paintCanvas.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\'><text y=\'19\' font-size=\'16\'>🌈</text></svg>"), auto';
      break;
    case 'glitter':
      paintCanvas.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\'><text y=\'19\' font-size=\'16\'>✨</text></svg>"), auto';
      break;
    default:
      paintCanvas.style.cursor = 'crosshair';
  }
}

function setPaintColor(color) {
  paintColor = color;
  
  // Highlight selected color
  document.querySelectorAll('.color-swatch').forEach(el => {
    el.style.border = '1px solid #333';
  });
  
  const swatches = document.querySelectorAll('.color-swatch');
  for (let swatch of swatches) {
    if (swatch.style.background.includes(color.toLowerCase()) || 
        swatch.style.background.includes(color.toUpperCase())) {
      swatch.style.border = '2px solid white';
      break;
    }
  }
}

function setPaintLineWidth(width) {
  paintLineWidth = width;
  
  // Highlight selected width
  document.querySelectorAll('.size-btn').forEach(el => {
    el.style.border = 'none';
  });
  
  const sizeButtons = document.querySelectorAll('.size-btn');
  const targetSize = width * 1.5 + 10;
  
  for (let button of sizeButtons) {
    const buttonWidth = parseInt(button.style.width);
    if (buttonWidth === targetSize) {
      button.style.border = '2px solid #FF80CC';
      break;
    }
  }
}

function startPainting(e) {
  isPainting = true;
  
  // Get coordinates relative to canvas
  const rect = paintCanvas.getBoundingClientRect();
  lastX = e.clientX - rect.left;
  lastY = e.clientY - rect.top;
  startX = lastX;
  startY = lastY;
  
  // For stamp tool, place stamp immediately
  if (paintTool === 'stamp') {
    placeStamp(lastX, lastY);
    isPainting = false;
  }
}

function placeStamp(x, y) {
  const stamp = cuteStamps[currentStamp];
  paintCtx.font = `${stampSize}px serif`;
  paintCtx.textAlign = 'center';
  paintCtx.textBaseline = 'middle';
  paintCtx.fillText(stamp, x, y);
}

function createRainbowGradient(x, y, size) {
  const gradient = paintCtx.createRadialGradient(x, y, 0, x, y, size);
  gradient.addColorStop(0, '#FF99AC');
  gradient.addColorStop(0.1, '#FDFFAB');
  gradient.addColorStop(0.3, '#B8F7D4');
  gradient.addColorStop(0.5, '#A0C4FF');
  gradient.addColorStop(0.7, '#BDB2FF');
  gradient.addColorStop(0.9, '#FFB6D9');
  gradient.addColorStop(1, '#FF80CC');
  return gradient;
}

function drawHeart(x, y, size) {
  paintCtx.beginPath();
  const topCurveHeight = size * 0.3;
  paintCtx.moveTo(x, y + topCurveHeight);
  // Left curve
  paintCtx.bezierCurveTo(
    x, y, 
    x - size/2, y, 
    x - size/2, y + topCurveHeight
  );
  // Bottom left
  paintCtx.bezierCurveTo(
    x - size/2, y + (size * 0.7), 
    x, y + (size * 1.1), 
    x, y + (size * 1.1)
  );
  // Bottom right
  paintCtx.bezierCurveTo(
    x, y + (size * 1.1), 
    x + size/2, y + (size * 0.7), 
    x + size/2, y + topCurveHeight
  );
  // Right curve
  paintCtx.bezierCurveTo(
    x + size/2, y, 
    x, y, 
    x, y + topCurveHeight
  );
  paintCtx.closePath();
  paintCtx.fill();
}

function drawStar(x, y, size) {
  const spikes = 5;
  const outerRadius = size;
  const innerRadius = size / 2.5;
  
  let rot = Math.PI / 2 * 3;
  let cx = x;
  let cy = y;
  let step = Math.PI / spikes;
  
  paintCtx.beginPath();
  paintCtx.moveTo(cx, cy - outerRadius);
  
  for (let i = 0; i < spikes; i++) {
    let x1 = cx + Math.cos(rot) * outerRadius;
    let y1 = cy + Math.sin(rot) * outerRadius;
    paintCtx.lineTo(x1, y1);
    rot += step;
    
    let x2 = cx + Math.cos(rot) * innerRadius;
    let y2 = cy + Math.sin(rot) * innerRadius;
    paintCtx.lineTo(x2, y2);
    rot += step;
  }
  
  paintCtx.lineTo(cx, cy - outerRadius);
  paintCtx.closePath();
  paintCtx.fill();
}

function drawGlitter(x, y, size) {
  // Draw multiple small sparkles
  for (let i = 0; i < 5; i++) {
    const sparkleX = x + (Math.random() * size * 2) - size;
    const sparkleY = y + (Math.random() * size * 2) - size;
    const sparkleSize = Math.random() * size * 0.8 + size * 0.2;
    
    // Draw star shape
    drawStar(sparkleX, sparkleY, sparkleSize);
  }
}

function paint(e) {
  if (!isPainting) return;
  
  // Get coordinates relative to canvas
  const rect = paintCanvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  paintCtx.lineJoin = 'round';
  paintCtx.lineCap = 'round';
  
  switch(paintTool) {
    case 'pencil':
      paintCtx.lineWidth = paintLineWidth;
      paintCtx.strokeStyle = paintColor;
      paintCtx.beginPath();
      paintCtx.moveTo(lastX, lastY);
      paintCtx.lineTo(x, y);
      paintCtx.stroke();
      break;
      
    case 'brush':
      paintCtx.lineWidth = paintLineWidth * 1.5;
      paintCtx.strokeStyle = paintColor;
      paintCtx.beginPath();
      paintCtx.moveTo(lastX, lastY);
      paintCtx.lineTo(x, y);
      paintCtx.stroke();
      break;
      
    case 'heart':
      paintCtx.fillStyle = paintColor;
      drawHeart(x, y, paintLineWidth * 4);
      break;
      
    case 'star':
      paintCtx.fillStyle = paintColor;
      drawStar(x, y, paintLineWidth * 3);
      break;
      
    case 'eraser':
      paintCtx.lineWidth = paintLineWidth * 2;
      paintCtx.strokeStyle = '#fff8fc';
      paintCtx.beginPath();
      paintCtx.moveTo(lastX, lastY);
      paintCtx.lineTo(x, y);
      paintCtx.stroke();
      break;
      
    case 'rainbow':
      paintCtx.lineWidth = paintLineWidth * 2;
      paintCtx.strokeStyle = createRainbowGradient(x, y, paintLineWidth * 4);
      paintCtx.beginPath();
      paintCtx.moveTo(lastX, lastY);
      paintCtx.lineTo(x, y);
      paintCtx.stroke();
      break;
      
    case 'glitter':
      paintCtx.fillStyle = paintColor;
      drawGlitter(x, y, paintLineWidth * 1.5);
      break;
  }
  
  lastX = x;
  lastY = y;
}

function stopPainting() {
  if (isPainting) {
    // For shapes, we'll draw the final shape on mouse up
    if (paintTool === 'line' || paintTool === 'rectangle' || paintTool === 'circle') {
      // The final shape is already drawn by the paint function
    }
    
    isPainting = false;
  }
}

function updateCoordinates(e) {
  const rect = paintCanvas.getBoundingClientRect();
  const x = Math.floor(e.clientX - rect.left);
  const y = Math.floor(e.clientY - rect.top);
  
  document.getElementById('paint-coordinates').textContent = `${x},${y} px`;
}

// Email functionality
function showEmailFolder(folder) {
  // Hide all email lists
  document.getElementById('inbox-emails').style.display = 'none';
  document.getElementById('spam-emails').style.display = 'none';
  
  // Show selected folder's emails
  document.getElementById(folder + '-emails').style.display = 'table-row-group';
  
  // Update folder highlights
  const folders = document.querySelectorAll('.email-folder');
  folders.forEach(f => f.classList.remove('active-folder'));
  
  // Highlight the clicked folder
  event.currentTarget.classList.add('active-folder');
  event.currentTarget.style.background = '#cbe8fb';
  
  // Unhighlight other folders
  folders.forEach(f => {
    if (!f.classList.contains('active-folder')) {
      f.style.background = '';
    }
  });
  
  // Show first email in the folder
  const emailsInFolder = document.querySelectorAll(`#${folder}-emails .email-item`);
  if (emailsInFolder.length > 0) {
    const firstEmailId = emailsInFolder[0].getAttribute('onclick').match(/'([^']+)'/)[1];
    showEmail(firstEmailId);
  }
}

function showEmail(emailId) {
  // Hide all email bodies
  const emailBodies = document.querySelectorAll('.email-body');
  emailBodies.forEach(email => {
    email.style.display = 'none';
  });
  
  // Show selected email
  document.getElementById(emailId).style.display = 'block';
  
  // Update email item highlights
  const emailItems = document.querySelectorAll('.email-item');
  emailItems.forEach(item => {
    item.classList.remove('active-email');
    item.style.background = '';
  });
  
  // Find and highlight the clicked email in the list
  emailItems.forEach(item => {
    if (item.getAttribute('onclick').includes(emailId)) {
      item.classList.add('active-email');
      item.style.background = '#cbe8fb';
    }
  });
}

// Function to change desktop wallpaper
function changeWallpaper(wallpaperFile) {
  // Set the background directly using the full path
  document.body.style.backgroundImage = `url('assets/images/clouds.png')`;
  
  // Remove local storage to avoid conflicts
  localStorage.removeItem('win98Wallpaper');
  
  // Hide context menu
  document.getElementById("contextMenu").style.display = "none";
}

// Load saved wallpaper on page load
document.addEventListener('DOMContentLoaded', function() {
  // Clear any saved wallpaper to let CSS handle it
  localStorage.removeItem('win98Wallpaper');
  
  // The rest of this code is now commented out
  // const savedWallpaper = localStorage.getItem('win98Wallpaper');
  // if (savedWallpaper) {
  //   document.body.style.backgroundImage = `url('${savedWallpaper}')`;
  // }
});

// Music Player functionality
const songs = [
  {
    title: "Komorebi",
    artist: "Anitek",
    src: "https://assets.codepen.io/4358584/Anitek_-_Komorebi.mp3"
  },
  {
    title: "Bubble Pop",
    artist: "Candy Crush",
    src: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_be1a9c5ab1.mp3"
  },
  {
    title: "Pink Waves",
    artist: "Neon Heart",
    src: "https://cdn.pixabay.com/download/audio/2022/10/30/audio_aab9b3488c.mp3"
  }
];

let currentSongIndex = 0;
let isPlaying = false;

function initMusicPlayer() {
  const musicPlayer = document.getElementById('music-player');
  const playBtn = document.getElementById('play-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const audioPlayer = document.getElementById('audio-player');
  
  if (!musicPlayer || !audioPlayer) return;
  
  // Set initial song
  loadSong(songs[currentSongIndex]);
  updateTrackInfo();
  
  // Add event listeners for controls
  playBtn.addEventListener('click', () => {
    playSong();
  });
  
  pauseBtn.addEventListener('click', () => {
    pauseSong();
  });
  
  prevBtn.addEventListener('click', () => {
    prevSong();
  });
  
  nextBtn.addEventListener('click', () => {
    nextSong();
  });
  
  // Set volume
  audioPlayer.volume = 0.2;
  
  // Song ended event
  audioPlayer.addEventListener('ended', () => {
    nextSong();
  });
  
  // Add error handling for audio loading
  audioPlayer.addEventListener('error', (e) => {
    console.log('Audio error:', e);
    // Try to go to next song if current one fails
    if (songs.length > 1) {
      nextSong();
    }
  });
  
  // Make music player draggable
  makeMusicPlayerDraggable();
}

function loadSong(song) {
  if (!song || !song.src) {
    console.error('Invalid song data:', song);
    return;
  }
  
  const audioPlayer = document.getElementById('audio-player');
  if (!audioPlayer) return;
  
  // Clear any previous sources
  while (audioPlayer.firstChild) {
    audioPlayer.removeChild(audioPlayer.firstChild);
  }
  
  // Add new source
  const source = document.createElement('source');
  source.src = song.src;
  source.type = 'audio/mpeg';
  audioPlayer.appendChild(source);
  
  // Reset and load the new audio
  audioPlayer.load();
  
  // Update display
  updateTrackInfo();
  
  console.log('Loading song:', song.title, '- URL:', song.src);
}

function updateTrackInfo() {
  const trackInfo = document.getElementById('track-info');
  const song = songs[currentSongIndex];
  
  if (!trackInfo || !song) return;
  
  // Set the track info text with proper spacing
  trackInfo.innerHTML = `♫ Now Playing: ${song.title} - ${song.artist} ♫`;
  
  // Ensure the track info is visible
  trackInfo.style.display = 'block';
  
  // Make parent container visible
  const nowPlaying = trackInfo.closest('.now-playing');
  if (nowPlaying) {
    nowPlaying.style.display = 'flex';
  }
}

function playSong() {
  const audioPlayer = document.getElementById('audio-player');
  const musicPlayer = document.getElementById('music-player');
  
  // Re-enable actual audio playback
  audioPlayer.volume = 0.2; // Set low volume
  audioPlayer.play().catch(err => console.log('Audio play failed:', err));
  
  isPlaying = true;
  musicPlayer.classList.add('playing');
  
  // Animate cassette reels
  const leftReel = document.querySelector('.left-reel');
  const rightReel = document.querySelector('.right-reel');
  if (leftReel) leftReel.style.animationPlayState = 'running';
  if (rightReel) rightReel.style.animationPlayState = 'running';
}

function pauseSong() {
  const audioPlayer = document.getElementById('audio-player');
  const musicPlayer = document.getElementById('music-player');
  
  // Re-enable actual audio pause
  audioPlayer.pause();
  
  isPlaying = false;
  musicPlayer.classList.remove('playing');
  
  // Stop reel animation
  const leftReel = document.querySelector('.left-reel');
  const rightReel = document.querySelector('.right-reel');
  if (leftReel) leftReel.style.animationPlayState = 'paused';
  if (rightReel) rightReel.style.animationPlayState = 'paused';
}

function prevSong() {
  // Pause current song
  pauseSong();
  
  // Move to previous song index
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }
  
  console.log('Previous song, new index:', currentSongIndex);
  
  // Load the new song
  loadSong(songs[currentSongIndex]);
  
  // If was playing before, resume playing
  if (isPlaying) {
    setTimeout(() => playSong(), 100);
  }
}

function nextSong() {
  // Pause current song
  pauseSong();
  
  // Move to next song index
  currentSongIndex++;
  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }
  
  console.log('Next song, new index:', currentSongIndex);
  
  // Load the new song
  loadSong(songs[currentSongIndex]);
  
  // If was playing before, resume playing
  if (isPlaying) {
    setTimeout(() => playSong(), 100);
  }
}

function makeMusicPlayerDraggable() {
  const musicPlayer = document.getElementById('music-player');
  if (!musicPlayer) return;
  
  let isDragging = false;
  let offsetX = 0, offsetY = 0;
  
  // When mouse is pressed on the cassette header or window
  musicPlayer.querySelector('.cassette-header').addEventListener('mousedown', startDrag);
  musicPlayer.querySelector('.cassette-window').addEventListener('mousedown', startDrag);
  
  function startDrag(e) {
    // Don't start drag if clicking control buttons
    if (e.target.closest('.music-btn')) {
      return;
    }
    
    isDragging = true;
    
    // Calculate the offset from the pointer to the player edges
    const rect = musicPlayer.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    
    // Remove any existing transform that might interfere with dragging
    musicPlayer.style.transform = 'none';
    musicPlayer.style.transition = 'none';
    
    // Update z-index to bring player to front
    musicPlayer.style.zIndex = ++window.topZ;
    
    // Update the cursor style
    document.body.style.cursor = 'grabbing';
    
    e.preventDefault();
  }
  
  // When the mouse moves while dragging
  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    
    // Calculate new position
    let left = e.clientX - offsetX;
    let top = e.clientY - offsetY;
    
    // Ensure player stays within the viewport
    const width = musicPlayer.offsetWidth;
    const height = musicPlayer.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Constrain horizontally
    if (left < 0) left = 0;
    if (left + width > windowWidth) left = windowWidth - width;
    
    // Constrain vertically
    if (top < 0) top = 0;
    if (top + height > windowHeight) top = windowHeight - height;
    
    // Update player position
    musicPlayer.style.left = left + 'px';
    musicPlayer.style.top = top + 'px';
    musicPlayer.style.bottom = 'auto';
    musicPlayer.style.right = 'auto';
  });
  
  // When mouse is released
  document.addEventListener('mouseup', function() {
    if (!isDragging) return;
    
    isDragging = false;
    
    // Restore animation
    musicPlayer.style.transition = 'all 0.3s ease';
    
    // Reset cursor
    document.body.style.cursor = 'default';
  });
  
  // Also handle touch events for mobile devices
  musicPlayer.querySelector('.cassette-header').addEventListener('touchstart', handleTouchStart, { passive: false });
  musicPlayer.querySelector('.cassette-window').addEventListener('touchstart', handleTouchStart, { passive: false });
  
  function handleTouchStart(e) {
    // Don't start drag if touching control buttons
    if (e.target.closest('.music-btn')) {
      return;
    }
    
    isDragging = true;
    
    const touch = e.touches[0];
    const rect = musicPlayer.getBoundingClientRect();
    offsetX = touch.clientX - rect.left;
    offsetY = touch.clientY - rect.top;
    
    // Remove transform and update z-index
    musicPlayer.style.transform = 'none';
    musicPlayer.style.transition = 'none';
    musicPlayer.style.zIndex = ++window.topZ;
    
    e.preventDefault();
  }
  
  document.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    
    // Calculate new position
    let left = touch.clientX - offsetX;
    let top = touch.clientY - offsetY;
    
    // Ensure player stays within the viewport
    const width = musicPlayer.offsetWidth;
    const height = musicPlayer.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Constrain horizontally
    if (left < 0) left = 0;
    if (left + width > windowWidth) left = windowWidth - width;
    
    // Constrain vertically
    if (top < 0) top = 0;
    if (top + height > windowHeight) top = windowHeight - height;
    
    // Update player position
    musicPlayer.style.left = left + 'px';
    musicPlayer.style.top = top + 'px';
    musicPlayer.style.bottom = 'auto';
    musicPlayer.style.right = 'auto';
    
    e.preventDefault();
  }, { passive: false });
  
  document.addEventListener('touchend', function() {
    if (!isDragging) return;
    
    isDragging = false;
    
    // Restore animation
    musicPlayer.style.transition = 'all 0.3s ease';
  });
}

// Function to initialize the slideshow
function initSlideshow() {
  const slideshowContainer = document.getElementById('slideshow-container');
  const slides = document.querySelectorAll('.slide-image');
  const dots = document.querySelectorAll('.slide-dot');
  let currentSlide = 0;
  let slideInterval;
  
  // Function to show a specific slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Deactivate all dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show the current slide and activate its dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    // Update current slide index
    currentSlide = index;
  }
  
  // Function to go to the next slide
  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }
  
  // Add event listeners to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      
      // Reset the interval when manually changing slides
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    });
  });
  
  // Start the slideshow
  slideInterval = setInterval(nextSlide, 5000);
  
  // Make the slideshow container draggable
  let isDragging = false;
  let offsetX = 0, offsetY = 0;
  
  slideshowContainer.addEventListener('mousedown', (e) => {
    // Only start dragging if not clicking on the dots
    if (!e.target.classList.contains('slide-dot')) {
      isDragging = true;
      
      // Calculate the offset from the pointer to the slideshow container edges
      const rect = slideshowContainer.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      
      // Update z-index to bring slideshow to front
      slideshowContainer.style.zIndex = ++window.topZ;
    }
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    // Calculate new position
    let left = e.clientX - offsetX;
    let top = e.clientY - offsetY;
    
    // Ensure slideshow stays within the viewport
    const width = slideshowContainer.offsetWidth;
    const height = slideshowContainer.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Constrain horizontally
    if (left < 0) left = 0;
    if (left + width > windowWidth) left = windowWidth - width;
    
    // Constrain vertically
    if (top < 0) top = 0;
    if (top + height > windowHeight) top = windowHeight - height;
    
    // Update slideshow position
    slideshowContainer.style.left = left + 'px';
    slideshowContainer.style.top = top + 'px';
  });
  
  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
  
  // Handle touch events for mobile
  slideshowContainer.addEventListener('touchstart', (e) => {
    // Only start dragging if not touching on the dots
    if (!e.target.classList.contains('slide-dot')) {
      isDragging = true;
      
      const touch = e.touches[0];
      const rect = slideshowContainer.getBoundingClientRect();
      offsetX = touch.clientX - rect.left;
      offsetY = touch.clientY - rect.top;
      
      // Update z-index
      slideshowContainer.style.zIndex = ++window.topZ;
      
      e.preventDefault();
    }
  }, { passive: false });
  
  document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    
    // Calculate new position
    let left = touch.clientX - offsetX;
    let top = touch.clientY - offsetY;
    
    // Ensure slideshow stays within the viewport
    const width = slideshowContainer.offsetWidth;
    const height = slideshowContainer.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Constrain horizontally
    if (left < 0) left = 0;
    if (left + width > windowWidth) left = windowWidth - width;
    
    // Constrain vertically
    if (top < 0) top = 0;
    if (top + height > windowHeight) top = windowHeight - height;
    
    // Update slideshow position
    slideshowContainer.style.left = left + 'px';
    slideshowContainer.style.top = top + 'px';
    
    e.preventDefault();
  }, { passive: false });
  
  document.addEventListener('touchend', () => {
    isDragging = false;
  });
}

// Function to toggle sparkle cursor effect
let sparklesActive = false;
const sparkleContainer = document.createElement('div');
sparkleContainer.id = 'sparkle-container';
sparkleContainer.style.position = 'fixed';
sparkleContainer.style.pointerEvents = 'none';
sparkleContainer.style.top = '0';
sparkleContainer.style.left = '0';
sparkleContainer.style.width = '100vw';
sparkleContainer.style.height = '100vh';
sparkleContainer.style.zIndex = '9998';

function toggleSparkleMode() {
  if (!document.body.contains(sparkleContainer)) {
    document.body.appendChild(sparkleContainer);
  }
  
  sparklesActive = !sparklesActive;
  
  if (sparklesActive) {
    document.addEventListener('mousemove', createSparkle);
    showContextWindow('Sparkle Mode', 'Sparkles activated! Your cursor is now leaving a trail of glitter.');
  } else {
    document.removeEventListener('mousemove', createSparkle);
    showContextWindow('Sparkle Mode', 'Sparkle mode deactivated.');
  }
}

function createSparkle(e) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  
  // Random sparkle color
  const colors = ['#ffb6e6', '#e980cd', '#d760bb', '#ffc9ef', '#ff8ad8'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  // Set sparkle properties
  sparkle.style.position = 'absolute';
  sparkle.style.left = (e.clientX - 10) + 'px';
  sparkle.style.top = (e.clientY - 10) + 'px';
  sparkle.style.width = '10px';
  sparkle.style.height = '10px';
  sparkle.style.backgroundColor = randomColor;
  sparkle.style.borderRadius = '50%';
  sparkle.style.opacity = '0.8';
  sparkle.style.pointerEvents = 'none';
  sparkle.style.boxShadow = '0 0 5px ' + randomColor;
  
  // Add to container
  sparkleContainer.appendChild(sparkle);
  
  // Animate and remove
  const randomDuration = 500 + Math.random() * 1000;
  
  // Create and apply keyframe animation
  sparkle.animate([
    { transform: 'translateY(0) scale(1)', opacity: 0.8 },
    { transform: 'translateY(-40px) scale(0)', opacity: 0 }
  ], {
    duration: randomDuration,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  });
  
  // Remove after animation completes
  setTimeout(() => {
    if (sparkleContainer.contains(sparkle)) {
      sparkleContainer.removeChild(sparkle);
    }
  }, randomDuration);
}

// Connect function to context menu
document.addEventListener('DOMContentLoaded', function() {
  // Find the sparkle mode menu item and connect it
  const sparkleMenuItem = document.querySelector('.item:contains("Sparkle Mode")');
  if (sparkleMenuItem) {
    sparkleMenuItem.onclick = toggleSparkleMode;
  }
}); 