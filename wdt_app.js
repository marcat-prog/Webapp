console.log('JavaScript is working!');

// Global staff list
let staffList = [];

// Function to fetch staff data from the API
function staffUserGet() {
    fetch('https://randomuser.me/api/?results=5')
        .then(response => response.json())
        .then(data => {
            staffList = data.results.map(user => new Staff(
                user.name.first,
                user.name.last,
                user.picture.large,
            ));
            populateStaffTable(staffList);
        })
        .catch(error => console.error('Error fetching staff data:', error));
}

// Staff Class Definition
class Staff {
    constructor(firstName, lastName, picture) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.picture = picture;
        this.status = "In";
        this.outTime = null;
        this.returnTime = null;
        this.duration = null;
        this.notified = false;
    }
}

function populateStaffTable(staffList) {
    const staffTable = document.getElementById('staffTableBody');
    staffTable.innerHTML = '';

    staffList.forEach((staff, index) => {
        const row = document.createElement('tr');

        // Create separate "In" and "Out" buttons
        let inButton = `<button class="in-button" onClick="staffIn(${index})" ${staff.status === "In" ? "disabled" : ""}>In</button>`;
        let outButton = `<button class="out-button" onClick="staffOut(${index})" ${staff.status === "Out" ? "disabled" : ""}>Out</button>`;

        row.innerHTML = `
            <td><img src="${staff.picture}" alt="${staff.firstName}" width="50"></td>
            <td>${staff.firstName} ${staff.lastName}</td>
            <td>${staff.status}</td>
            <td>${staff.outTime || '-'}</td>
            <td>${staff.returnTime || '-'}</td>
            <td>${staff.duration || '-'}</td>
            <td>${inButton}</td>
            <td>${outButton}</td>
        `;

        staffTable.appendChild(row);
    });
}

// Function to handle "Out" button click for a selected staff member
function staffOut(index) {
    const staff = staffList[index];

    const durationMinutes = prompt(`Enter the absence duration (in minutes) for ${staff.firstName} ${staff.lastName}:`);
    if (isNaN(durationMinutes) || durationMinutes <= 0) {
        alert("Please enter a valid number greater than 0.");
        return;
    }

    const duration = parseInt(durationMinutes, 10);
    const currentTime = new Date();
    const returnTime = new Date(currentTime.getTime() + duration * 60000);

    staff.status = "Out";
    staff.outTime = currentTime.toTimeString().split(' ')[0].substring(0, 5);
    staff.returnTime = returnTime.toTimeString().split(' ')[0].substring(0, 5);
    staff.duration = calculateDuration(staff.outTime, staff.returnTime);

    console.log(`Staff Out: ${staff.firstName} ${staff.lastName}`);
    console.log(`Out Time: ${staff.outTime}, Return Time: ${staff.returnTime}`);

    populateStaffTable(staffList);
}

// Function to calculate duration between Out and Return time
function calculateDuration(outTime, returnTime) {
    const out = new Date(`1970-01-01T${outTime}:00Z`);
    const returned = new Date(`1970-01-01T${returnTime}:00Z`);
    const durationInMillis = returned - out;

    const hours = Math.floor(durationInMillis / 1000 / 60 / 60);
    const minutes = Math.floor((durationInMillis / 1000 / 60) % 60);
    return `${hours} hour(s) ${minutes} minute(s)`;
}

// Function to handle "In" button click for a selected staff member
function staffIn(index) {
    const staff = staffList[index];
    staff.status = "In";
    staff.outTime = null;
    staff.returnTime = null;
    staff.notified = false;

    console.log(`Staff In: ${staff.firstName} ${staff.lastName}`);
    populateStaffTable(staffList);
}

// Function to display a toast notification
function showToast(message, imageUrl, onClose) {
    const toast = document.getElementById('toast');
    toast.innerHTML = '';

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'center';

    if (imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Staff Photo';
        img.style.width = '50px';
        img.style.height = '50px';
        img.style.borderRadius = '50%';
        img.style.marginRight = '10px';
        container.appendChild(img);
    }

    const text = document.createElement('span');
    text.textContent = message;
    container.appendChild(text);

    toast.appendChild(container);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '10px';
    closeButton.addEventListener('click', () => {
        toast.style.display = 'none';
        if (onClose) onClose();
    });
    toast.appendChild(closeButton);

    toast.style.display = 'block';
}

// Function to check if staff members are late
function checkLateStaff() {
    const currentTime = new Date();

    staffList.forEach(staff => {
        if (staff.status === "Out" && staff.returnTime && !staff.notified) {
            const [hours, minutes] = staff.returnTime.split(':');
            const returnTime = new Date();
            returnTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

            if (currentTime > returnTime) {
                console.log(`${staff.firstName} ${staff.lastName} is late!`);
                showToast(`${staff.firstName} ${staff.lastName} is late!`, staff.picture, () => {
                    staff.notified = false;
                });
                staff.notified = true;
            }
        }
    });
}
// Initialize the dashboard on page load
document.addEventListener('DOMContentLoaded', function () {
    staffUserGet(); // Fetch and populate staff data
    setInterval(checkLateStaff, 60000); // Check for late staff every minute
});
// Global delivery driver list
let deliveryList = [];

// Delivery Driver Class
class DeliveryDriver {
    constructor(vehicle, name, surname, phone, address, returnTime, photo) {
        this.vehicle = vehicle;
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.address = address;
        this.returnTime = returnTime;
        this.photo = photo;
        this.notified = false; // To track if late notification has been shown
    }
}

// Function to add a delivery driver
function addDeliveryDriver() {
    const vehicle = document.getElementById('vehicleType').value;
    const name = document.getElementById('driverName').value.trim();
    const surname = document.getElementById('driverSurname').value.trim();
    const phone = document.getElementById('driverPhone').value.trim();
    const address = document.getElementById('deliveryAddress').value.trim();
    const returnTime = document.getElementById('returnTime').value;

    // Validate input
    if (!name || !surname || !phone || !address || !returnTime) {
        alert('Please fill in all fields!');
        return;
    }

    // Fetch a random photo using an API
    const photoUrl = `https://picsum.photos/200`; // This will fetch a random image

    // Create a new DeliveryDriver object with the random photo
    const driver = new DeliveryDriver(vehicle, name, surname, phone, address, returnTime, photoUrl);
    deliveryList.push(driver);

    // Refresh the delivery table
    populateDeliveryTable();
}


// Function to populate the delivery board table
function populateDeliveryTable() {
    const deliveryTable = document.getElementById('deliveryTableBody');
    deliveryTable.innerHTML = ''; // Clear existing rows

    deliveryList.forEach((driver, index) => {
        const row = document.createElement('tr');

        // Determine vehicle icon
        const vehicleIcon = driver.vehicle === 'Motorcycle' ? '🏍️' : '🚗';

        // Populate row with driver details
        row.innerHTML = `
            <td>${vehicleIcon}</td>
            <td>${driver.name} ${driver.surname}</td>
            <td>${driver.phone}</td>
            <td>${driver.address}</td>
            <td>${driver.returnTime}</td>
            <td><button class="clear-button" onClick="clearDriver(${index})">Clear</button></td>
        `;

        deliveryTable.appendChild(row);
    });
}

// Function to clear a driver from the board
function clearDriver(index) {
    const confirmClear = confirm('Are you sure you want to remove this driver?');
    if (confirmClear) {
        deliveryList.splice(index, 1); // Remove the driver from the list
        populateDeliveryTable(); // Refresh the table
    }
}

// Function to check for late drivers
function checkLateDrivers() {
    const currentTime = new Date();

    deliveryList.forEach(driver => {
        if (!driver.notified) {
            const [hours, minutes] = driver.returnTime.split(':');
            const returnTime = new Date();
            returnTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

            if (currentTime > returnTime) {
                showToast(
                    `Driver ${driver.name} ${driver.surname} is late! Contact: ${driver.phone}, Address: ${driver.address}`,
                    () => { driver.notified = false; }
                );
                driver.notified = true;
            }
        }
    });
}

// Event listener for the "Add" button
document.getElementById('addDelivery').addEventListener('click', addDeliveryDriver);

// Function to update and display the current date and time
function updateDigitalClock() {
    const clockElement = document.getElementById('digitalClock');
    const now = new Date();

    // Format the date and time
    const day = now.getDate();
    const month = now.toLocaleString('default', { month: 'long' }); // Full month name
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0'); // Ensure 2-digit format
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    // Combine the date and time into the required format
    const formattedTime = `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;

    // Update the clock element
    clockElement.textContent = formattedTime;
}

// Start the clock on page load and update every second
document.addEventListener('DOMContentLoaded', function () {
    updateDigitalClock(); // Call immediately
    setInterval(updateDigitalClock, 1000); // Update every second
});


// Check for late drivers every 60 seconds
setInterval(checkLateDrivers, 60000);
