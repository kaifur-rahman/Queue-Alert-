<h1>Queue Management System Backend</h1>

<p>This is the backend for a queue management system, inspired by the recent trend seen during Coldplay ticket bookings on platforms like BookMyShow. This system allows users to log in and join a priority queue based on timestamps when they click to use a service. The queue is managed in real-time, and users are notified about their position in the queue via WebSockets.</p>

<h2>Features</h2>
<ul>
  <li><strong>JWT-Based Authentication:</strong> Secure user login using JSON Web Tokens (JWT) and cookie-based security.</li>
  <li><strong>Priority Queue:</strong> Users are placed in the queue based on the timestamp of their request to use the service.</li>
  <li><strong>Real-Time Updates:</strong> WebSockets are used to notify users of their current queue position in real time.</li>
  <li><strong>Queue Management:</strong> Handles queue operations like push (add user) and pop (remove user) efficiently.</li>
  <li><strong>Scalable Architecture:</strong> The system is designed to handle a large number of users concurrently.</li>
</ul>

<h2>Technologies Used</h2>
<ul>
  <li><strong>Node.js:</strong> Server-side JavaScript runtime environment.</li>
  <li><strong>Express.js:</strong> Web framework for building the API.</li>
  <li><strong>MongoDB:</strong> NoSQL database for storing user information and queue data.</li>
  <li><strong>WebSockets
