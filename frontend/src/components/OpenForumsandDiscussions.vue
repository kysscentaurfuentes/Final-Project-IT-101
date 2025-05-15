<template>
  <div class="open-forums-container">
    <aside class="side-navigation">
      <NavigationBar />
    </aside>
    <main class="main-content">
      <h2>Open Forums and Discussions</h2>

      <div class="forum-content-wrapper">
        <div class="forum-list">
          <h3>Available Forums</h3>
          <ul v-if="forums.length > 0">
            <li
              v-for="forum in forums"
              :key="forum.id"
              @click="selectForum(forum)"
            >
              {{ forum.name }}
              <span class="topic-count"
                >({{ forum.topics.length }} Topics)</span
              >
            </li>
          </ul>
          <p v-else>No forums available yet.</p>
        </div>

        <div v-if="selectedForum" class="forum-view">
          <h3>{{ selectedForum.name }}</h3>
          <div class="topic-list">
            <h4>Topics</h4>
            <ul v-if="selectedForum.topics.length > 0">
              <li
                v-for="topic in selectedForum.topics"
                :key="topic.id"
                @click="selectTopic(topic)"
              >
                {{ topic.title }}
                <span class="post-count">({{ topic.posts.length }} Posts)</span>
              </li>
            </ul>
            <p v-else>No topics in this forum yet.</p>
            <button @click="showNewTopicForm = true">Start a New Topic</button>
          </div>

          <div v-if="selectedTopic" class="topic-discussion">
            <h4>{{ selectedTopic.title }}</h4>
            <div class="post-list">
              <div
                v-for="post in selectedTopic.posts"
                :key="post.id"
                class="post"
              >
                <div class="post-header">
                  <strong>{{ post.author }}</strong>
                  <span class="post-date">{{ post.date }}</span>
                </div>
                <div class="post-content">{{ post.content }}</div>
              </div>
            </div>
            <textarea
              v-model="newPostContent"
              placeholder="Write your reply..."
            ></textarea>
            <button @click="addPost">Post Reply</button>
          </div>

          <div v-if="showNewTopicForm" class="new-topic-form">
            <h4>Start a New Topic in {{ selectedForum.name }}</h4>
            <input
              type="text"
              v-model="newTopicTitle"
              placeholder="Topic Title"
            />
            <textarea
              v-model="newTopicContent"
              placeholder="Your initial post..."
            ></textarea>
            <button @click="createTopic">Create Topic</button>
            <button @click="showNewTopicForm = false">Cancel</button>
          </div>
        </div>

        <div v-else-if="forums.length > 0" class="select-forum-message">
          <p>Select a forum to view topics.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavigationBar from "./NavigationBar.vue"; // Assuming you have this

// Simulate forum data (replace with backend integration in a real app)
const forums = ref([
  {
    id: 1,
    name: "General Discussions",
    topics: [
      {
        id: 101,
        title: "Introduction to ICT Lab Usage",
        posts: [
          {
            id: 1001,
            author: "User1",
            date: "2025-05-12 21:15",
            content:
              "Hi everyone, new here! Any tips for using the lab effectively?",
          },
          {
            id: 1002,
            author: "Admin",
            date: "2025-05-12 21:18",
            content:
              "Welcome! Check the announcements board and ask the lab assistants for help.",
          },
        ],
      },
      {
        id: 102,
        title: "Software Suggestions",
        posts: [
          {
            id: 1003,
            author: "TechEnthusiast",
            date: "2025-05-12 21:20",
            content: "What new software would you like to see in the lab?",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Troubleshooting & Help",
    topics: [],
  },
  {
    id: 3,
    name: "Announcements (Read-only)",
    topics: [
      {
        id: 103,
        title: "Upcoming Maintenance Schedule",
        posts: [
          {
            id: 1004,
            author: "Admin",
            date: "2025-05-12 21:22",
            content:
              "Please note that there will be a system maintenance on May 15th from 2 PM to 4 PM.",
          },
        ],
      },
    ],
  },
]);

const selectedForum = ref(null);
const selectedTopic = ref(null);
const newPostContent = ref("");
const newTopicTitle = ref("");
const newTopicContent = ref("");
const showNewTopicForm = ref(false);

const selectForum = (forum) => {
  selectedForum.value = forum;
  selectedTopic.value = null;
  showNewTopicForm.value = false;
};

const selectTopic = (topic) => {
  selectedTopic.value = topic;
  showNewTopicForm.value = false;
};

const addPost = () => {
  if (selectedTopic.value && newPostContent.value.trim() !== "") {
    selectedTopic.value.posts.push({
      id: Date.now(), // Simple unique ID
      author: "Current User (Simulated)", // Replace with actual user info
      date: new Date().toLocaleString(),
      content: newPostContent.value,
    });
    newPostContent.value = "";
  }
};

const createTopic = () => {
  if (
    selectedForum.value &&
    newTopicTitle.value.trim() !== "" &&
    newTopicContent.value.trim() !== ""
  ) {
    const newTopic = {
      id: Date.now(), // Simple unique ID
      title: newTopicTitle.value,
      posts: [
        {
          id: Date.now() + 1,
          author: "Current User (Simulated)", // Replace with actual user info
          date: new Date().toLocaleString(),
          content: newTopicContent.value,
        },
      ],
    };
    selectedForum.value.topics.push(newTopic);
    newTopicTitle.value = "";
    newTopicContent.value = "";
    showNewTopicForm.value = false;
  }
};
</script>

<style scoped>
.open-forums-container {
  display: flex;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  background-image: url("../assets/images/forum_bg.jpg"); /* Replace with your background */
  background-size: cover;
  background-position: center;
  position: relative;
}

.side-navigation {
  background-color: #333;
  color: white;
  width: 200px; /* Fixed width for consistent sidebar */
  padding: 20px;
  z-index: 1;
}

.main-content {
  flex-grow: 1;
  padding: 30px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
}

h2 {
  color: black; /* Make the header font black */
  text-align: center;
  margin-bottom: 25px;
  font-size: 2rem;
  text-shadow: none; /* Remove text shadow if it was there */
  width: 100%;
}

.forum-list,
.forum-view,
.select-forum-message {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  width: 80%;
  max-width: 900px;
}

.forum-list h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 15px;
  text-align: left; /* Align forum list title to the left */
}

.forum-list ul {
  list-style: none;
  padding: 0;
}

.forum-list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left; /* Align list items to the left */
}

.forum-list li:last-child {
  border-bottom: none;
}

.forum-list li:hover {
  background-color: #f9f9f9;
}

.topic-count,
.post-count {
  color: #777;
  font-size: 0.9em;
}

.forum-view h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 15px;
  text-align: left; /* Align forum view title to the left */
}

.topic-list h4 {
  color: #555;
  margin-top: 20px;
  border-bottom: 1px dashed #ccc;
  padding-bottom: 5px;
  margin-bottom: 10px;
  text-align: left; /* Align topic list title to the left */
}

.topic-list ul {
  list-style: none;
  padding: 0;
}

.topic-list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left; /* Align topic list items to the left */
}

.topic-list li:last-child {
  border-bottom: none;
}

.topic-list li:hover {
  background-color: #f9f9f9;
}

.topic-list button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 15px;
  transition: background-color 0.2s ease;
}

.topic-list button:hover {
  background-color: #0056b3;
}

.topic-discussion h4 {
  color: #333;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 15px;
  text-align: left; /* Align topic discussion title to the left */
}

.post-list {
  margin-bottom: 20px;
}

.post {
  background-color: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  text-align: left; /* Align post content to the left */
}

.post-header {
  font-size: 0.9em;
  color: #777;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
}

.post-content {
  line-height: 1.5;
  color: #333;
}

.topic-discussion textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 1em;
}

.topic-discussion button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.2s ease;
}

.topic-discussion button:hover {
  background-color: #1e7e34;
}

.new-topic-form {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  max-width: 900px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align form content to the left */
}

.new-topic-form h4 {
  color: #333;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 15px;
  text-align: left; /* Align form title to the left */
}

.new-topic-form input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 1em;
}

.new-topic-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 1em;
  min-height: 100px;
}

.new-topic-form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  margin-right: 10px;
  transition: background-color 0.2s ease;
}

.new-topic-form button:last-child {
  background-color: #dc3545;
}

.new-topic-form button:hover {
  background-color: #0056b3;
}

.new-topic-form button:last-child:hover {
  background-color: #c82333;
}

.select-forum-message {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  max-width: 900px;
  text-align: center;
  color: #555;
}
</style>
