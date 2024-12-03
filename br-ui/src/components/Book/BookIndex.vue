<template>
    <div class="custom-container mt-4">
      <!-- Header with Username and Icon -->
      <header class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="text-primary">Book Recommendations</h1>
        <div class="d-flex align-items-center">
         <i class="fas fa-user" ></i>
          <span class="fs-5">{{ username }}</span>&nbsp;&nbsp;&nbsp;
          <button class="btn btn-outline-secondary btn-sm ms-2" @click="logout">
            Logout
          </button>
        </div>
      </header>
      
      <div class="row">
        <div class="col-12">
            <div class="row">
                <div class="col-3">
                    <input v-model="searchTitle" type="text" placeholder="Search by title" />
                </div>
                <div class="col-3">
                    <input v-model="searchAuthor" type="text" placeholder="Search by author" />
                </div>
                <div class="col-3">
                    <input v-model="searchCategory" type="text" placeholder="Search by category" />
                </div>
                <div class="col-3">
                    <button @click="searchBooks" class="btn btn-primary">Search<font-awesome-icon icon="search" /></button>
                </div>
            </div>
            
        </div>
        
      </div>
     
      <div>
        <div class="row">
            
        </div>
        <div v-if="books.length">
            <h2>Search Results:</h2>
            <div class="library-scroll-container d-flex overflow-auto search-results" v-if="books.length">
                <div class="book-card col-md-4 col-lg-3 mb-3 mt-3" v-for="book in books" :key="book.id">
                    <img :src="book.cover_image" alt="Book Cover" class="book-cover" style="height: 300px; object-fit: cover" />
                    <h3>{{ book.title }}</h3>
                    <p><strong>Author:</strong> {{ book.author }}</p>
                    <p><strong>Category:</strong> {{ book.category }}</p>
                    <button @click="addToLibrary(book.id)">Add to My Library</button>
                </div>
            </div>
        </div>
        <div v-if="recommendations.length" class="row">
            <div class="d-flex col-12">
                <h4 class="text-primary">Recommend for you</h4>
            </div>
            <div class="library-scroll-container d-flex overflow-auto">
                <div v-for="(book, index) in recommendations" :key="index">
                    <div class="card h-100">
                        <img
                            :src="book.cover_image"
                            class="card-img-top"
                            alt="Book Cover"
                            style="height: 300px; object-fit: cover"
                            @click="openReviewModal(book)"/>
                        <div class="card-body">
                        <h5 class="card-title">{{ book.title }}</h5>
                        <p class="card-text mb-1"><strong>Author:</strong> {{ book.author }}</p>
                        <p class="card-text"><strong>Category:</strong> {{ book.category }}</p>
                        <button class="btn btn-primary" @click="openReviewModal(book)">Add Review</button>
                        <button class="btn btn-danger mt-2" @click="removeFromLibrary(book.id)">Remove from Library</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-if="libraryBooks.length" class="row">
            <div class="col-lg-12">
                <div class="d-flex col-12">
                    <h4 class="text-primary">My Library</h4>
                </div>
                <div class="library-scroll-container d-flex overflow-auto">
                    <div 
                    v-for="book in libraryBooks"  
                    :key="book.id" 
                    class="col-md-4 col-lg-3 mb-3 mt-3">
                    <div class="card h-100">
                        <img
                            :src="book.cover_image"
                            class="card-img-top"
                            alt="Book Cover"
                            style="height: 300px; object-fit: cover"
                            @click="openReviewModal(book)"/>
                        <div class="card-body">
                        <h5 class="card-title">{{ book.title }}</h5>
                        <p class="card-text mb-1"><strong>Author:</strong> {{ book.author }}</p>
                        <p class="card-text"><strong>Category:</strong> {{ book.category }}</p>

                        <button v-if="!book.review" class="btn btn-primary" @click="selectBook(book)"><i class="fas fa-comment-alt"></i> </button>
                        <div v-if="selectedBook && selectedBook.id === book.id && !book.review">
                            <textarea v-model="reviewText" class="form-control" id="reviewText" rows="4" placeholder="Type your review here..."></textarea>
                            <button class="btn btn-success mt-2" @click="submitReview">Submit Review</button>
                        </div>

                        <div v-if="book.review"><textarea v-model="book.review" class="form-control" id="reviewText" rows="4"></textarea></div>
                        <button class="btn btn-danger mt-2" @click="removeFromLibrary(book.id)"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <!-- <div class="modal fade" id="reviewModal" tabindex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true" v-if="showModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="reviewModalLabel">Add Review for {{ selectedBook?.title }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        <textarea 
                        v-model="reviewText" 
                        class="form-control" 
                        placeholder="Write your review here..." 
                        rows="5"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Close</button>
                        <button type="button" class="btn btn-primary" @click="submitReview">Submit Review</button>
                    </div>
                    </div>
                </div>
            </div> -->
        </div>
        
      </div>
      <div class="row">
        
      </div>
    </div>
    
  </template>
  
  <script>
  import axios from "axios";
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import Config from '../../config/config.js'
  
  export default {
    components:{
        FontAwesomeIcon
    },
    data() {
      return {
        username: sessionStorage.getItem("username"), // Replace with actual username logic
        searchQuery: "",
        books: [], // Holds the search results
        libraryBooks:[],
        searchTitle:"",
        searchAuthor:"",
        searchCategory:"",
        query: '', // User input for search
        recommendations: [], // Array to store recommendation results
        loading: false, // Loading state
        error: null, 
        showModal: false,
        selectedBook: [],
        userId: 1
      };
    },
    methods: {
    selectBook(book) {
        // this.selectedBook=book; 
        // console.log("selected book",this.selectBook);
        // this.reviewText = ""; 
        // this.showModal = true;
        // console.log("show model",this.showModal);
        if (this.selectedBook && this.selectedBook.id === book.id) {
            // If the book is already selected, deselect it
            this.selectedBook = null;
            this.reviewText = ""; // Clear review text
        } else {
            // Set the selected book and clear previous review text
            this.selectedBook = book;
            this.reviewText = "";
        }
    },
      logout() {
        this.$router.push('/');
      },
      async searchBooks() {
        const searchParams = {
        title: this.searchTitle,  // Bind these to your input fields
        author: this.searchAuthor,
        category: this.searchCategory
        };

        try {
            const response = await axios.get(Config.API+'/search-books', { params: searchParams });
            console.log("books",response);
            this.books = response.data;  // Store search results in your component
        } catch (error) {
            console.error("Error searching books:", error);
        }
      },
      async fetchUserLibrary() {
        try {
        const userId = 1; 
        const response = await axios.get(Config.API+`/user-library/${userId}`);
        this.libraryBooks = response.data;
        } catch (error) {
        console.error("Error fetching user library:", error);
        }
    },
    async addToLibrary() {
      try {
        const userId = 1; 
        const channelId = 1313008653778948146;
        const response = await axios.post(Config.API+`/add-to-library/${userId}`, {channelId});
        alert('Book added to your library!');
        console.log("response",response);
      } catch (error) {
        console.error('Error adding book to library:', error);
      }
    },
    async fetchRecommendations() {
      this.loading = true;
      this.error = null;
      this.recommendations = [];

      try {
        const response = await axios.get(Config.API+'/recommendations'); 
        console.log("res",response);
        this.recommendations = response.data; 
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        this.error = 'Failed to fetch recommendations.';
      } finally {
        this.loading = false; 
      }
    },
    async submitReview() {
      if (!this.reviewText.trim()) {
        alert("Please write a review before submitting.");
        return;
      }

      const bookId = this.selectedBook.id;
      const reviewText = this.reviewText.trim();

   
    await axios.post(Config.API+`/reviews?`+bookId, { review: reviewText })
        .then((response) => {
        if (response.data.success) {
            this.reviewText = ""; 
            this.selectedBook = null; 
            alert("Review submitted successfully!"); 
        } else {
            alert("Failed to submit the review. Please try again later.");
        }
        })
        .catch((error) => {
        console.error('Error:', error);
        alert('Error submitting the review. Please try again later.');
        });

      alert("Review submitted successfully!");
    },
    async removeFromLibrary(bookId) {
        let userId = 1;
        //let data = {"bookId":bookId}
        await axios.delete(Config.API+`/library?userId=`+userId+ `&bookId=`+bookId)
        .then(response => {
        if (response.data.success) {
            alert(response.data.message); 
            this.libraryBooks = this.libraryBooks.filter(book => book.id !== bookId);
        } else {
            alert(response.data.message); // Display message if book not found
        }
        })
        .catch(error => {
        console.error('Error:', error);
        alert('Failed to remove the book. Please try again later.');
        });
    },
    },
    mounted() {
        this.fetchUserLibrary();
        this.fetchRecommendations();
    },
    
  };
  </script>
  
  <style scoped>
  /* Adjust card image styling for consistent layout */
  .card-img-top {
    height: 300px;
    object-fit: cover;
  }
  .library-scroll-container {
  display: flex;                  /* Use flexbox for horizontal layout */
  flex-wrap: nowrap;               /* Ensure items don't wrap to the next line */
  overflow-x: auto;                /* Enable horizontal scrolling */
  padding-bottom: 20px;            /* Add some space at the bottom for scroll */
}

.library-scroll-container .col-md-4,
.library-scroll-container .col-lg-3 {
  flex: 0 0 auto;                  /* Prevent items from stretching to fill space */
  margin-right: 15px;              /* Add spacing between cards */
}
.custom-container {
    width: 90%; 
    max-width: 1300px; 
    margin: 0 auto; 
  }
  </style>
  