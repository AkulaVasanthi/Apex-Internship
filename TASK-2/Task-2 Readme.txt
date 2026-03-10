🚀 Quick-Task Planner 

A modern, interactive task management dashboard built with HTML5, CSS3, and Vanilla JavaScript. This project was designed to demonstrate core web development concepts including DOM manipulation, responsive layouts, and form validation.

🌟 Key Features

Glassmorphism UI: A high-end, modern design featuring a frosted glass effect and a high-resolution background.

Three-Stage Workflow: Organize tasks into "To-Do," "In Progress," and "Done" columns.

Smart Validation: Prevents empty tasks or "space-only" entries from cluttering the board.

Dynamic State Management: Tasks move seamlessly between columns without page refreshes.

Fully Responsive: The layout uses Flexbox to automatically stack columns on mobile devices and expand on desktops.

🛠️ Technical Implementation

According to the project requirements, this application implements the following:

HTML & CSS: Structured using semantic tags and styled with modern CSS properties like backdrop-filter and linear-gradient.

Form Validation: JavaScript checks user input before creation to ensure data integrity.

Advanced Layouts:

Flexbox: Used for the 3-column board structure and item alignment.

Media Queries: Ensures the board is usable on all screen sizes.

DOM Manipulation:

document.createElement to generate task cards.

appendChild() to move cards from one section of the board to another.

remove() to delete completed tasks.

📂 Project Structure
Plaintext
├── Quick_Task_planner.html   # The structural skeleton of the planner
├── Quick_Task_planner.css    # Modern styles and glassmorphism effects
├── Quick_Task_planner.js    # Logic for validation and moving tasks
└── Quick_Task_planner.txt    # Readme file
🚀 How to Run the Project
Download the project files.

Ensure Quick_Task_planner.html, Quick_Task_planner.css, and Quick_Task_planner.js are in the same folder.

Open Quick_Task_planner.html in any modern web browser (Chrome, Firefox, Edge).

Start adding tasks!

📝 Usage Instructions
Adding a Task: Type your task into the top input field and click "Add Task".

Moving a Task: Click the "Move Next →" button on any task card to advance it to the next column.

Deleting a Task: Once a task reaches the "Done" column, clicking the red "Remove" button will delete it from the view.
