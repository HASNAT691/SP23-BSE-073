
// Project descriptions (simulating loading from external files)
const projectDescriptions = {
    project2: `
        <h2>Task Manager</h2>
        <p>A robust task management system designed for team collaboration. 
        Features include:</p>
        <ul>
            <li>User authentication and role-based access control</li>
            <li>Real-time updates using WebSocket technology</li>
            <li>Task categorization and priority management</li>
            <li>File attachment support</li>
            <li>Email notifications for task updates</li>
        </ul>
        <p>Technologies used: MongoDB, Express.js, React, Node.js, Socket.io</p>
    `,
    project3: `
        <h2>E-commerce Platform</h2>
        <p>A full-featured e-commerce solution with modern architecture. 
        Key implementations:</p>
        <ul>
            <li>Secure payment processing with Stripe integration</li>
            <li>Real-time inventory management system</li>
            <li>Customer review and rating system</li>
            <li>Advanced product search and filtering</li>
            <li>Admin dashboard for order management</li>
        </ul>
        <p>Technologies used: Next.js, PostgreSQL, TypeScript, AWS</p>
    `,
    project5: `
        <h2>Library Management System</h2>
        <p>The Library Management System is a complete solution to manage library resources and operations efficiently. 
        Key features include:</p>
        <ul>
            <li>Cataloging of books, journals, and multimedia resources</li>
            <li>Member registration and loan management</li>
            <li>Real-time tracking of book availability</li>
            <li>Automated due date reminders</li>
            <li>Detailed reporting on library activities</li>
        </ul>
        <p>Technologies used: Java, MySQL, Spring Boot, Hibernate</p>
    `
};

// Show modal with project description
$('.show-description-btn').click(function() {
    const projectId = $(this).data('project');
    $('#modalContent').html(projectDescriptions[projectId]);
    $('#descriptionModal').fadeIn();
});

// Close modal
$('.close-modal').click(function() {
    $('#descriptionModal').fadeOut();
});

// Close modal when clicking outside
$(window).click(function(event) {
    if (event.target == document.getElementById('descriptionModal')) {
        $('#descriptionModal').fadeOut();
    }
});
