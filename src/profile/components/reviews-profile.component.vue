<script>
import { userApiService } from "../services/user-api.service.js";
import { reviewApiService } from "../../publisher-profile/services/reviews-api.service.js";
import { Review } from "../../publisher-profile/model/review.entity.js";
import 'primeicons/primeicons.css'

export default {
  name: 'reviews-profile',
  data() {
    return {
      user: {},
      reviews: [],
      myReviews: [],
      averageScore: 0,
      totalReviews: 0,
      ratings: [],
      userService: new userApiService(),
      reviewService: new reviewApiService(),
      loading: true,
      error: null
    };
  },
  methods: {
    async getUser() {
      try {
        const userId = Number(localStorage.getItem('user'));
        const response = await this.userService.getUserById(userId);
        this.user = response.data;
      } catch (err) {
        this.error = err;
      }
    },
    async getAllReviews() {
      try {
        const response = await this.reviewService.getReviews();
        const allReviews = response.data;

        allReviews.forEach(review => {
          this.reviews.push(new Review(
              review.id,
              review.content,
              review.score,
              review.get_user_id,
              review.give_user_id
          ));
        });

        for (const review of this.reviews) {
          const userResponse = await this.userService.getUserById(Number(review.give_user_id));
          review.setGiveUserName = userResponse.data.name;
          review.setGiveUserImg = userResponse.data.img;
        }

        this.myReviews = this.reviews.filter(review => review.get_user_id === localStorage.getItem('user'));
        this.totalReviews = this.myReviews.length;

        for (let i = 5; i >= 1; i--) {
          const count = this.myReviews.filter(review => review.score === i).length;
          const percentage = (count / this.totalReviews) * 100;
          this.ratings.push({ score: i, percentage: percentage });
        }

        this.averageScore = this.totalReviews > 0
            ? this.myReviews.reduce((acc, review) => acc + review.score, 0) / this.totalReviews
            : 0;
      } catch (err) {
        this.error = err;
      }
    },
    getStarIcons(score) {
      const starIcons = [];
      for (let i = 0; i < 5; i++) {
        if (i < score) {
          starIcons.push({ icon: 'complete' });
        } else {
          starIcons.push({ icon: 'none'});
        }
      }
      return starIcons;
    },
    getStarRating(score) {
      const starRating = [];
      const fullStars = Math.floor(score);
      const decimalPart = score - fullStars;
      for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
          starRating.push({ icon: 'star' });
        } else if (i === fullStars && decimalPart >= 0.01 && decimalPart < 0.99) {
          starRating.push({ icon: 'star_half' });
        } else {
          starRating.push({ icon: 'stars' });
        }
      }
      return starRating;
    }
  },
  async created() {
    await this.getUser();
    await this.getAllReviews();
  }
};
</script>

<template>
  <div class="reviews-title">
    <p>Mis reseñas:</p>
  </div>
  <div class="my-reviews-analytics">
    <div class="line-text">
      <div class="line"></div>
    </div>
    <div class="analytics">
      <div class="average-score">
        <p>{{ averageScore.toFixed(2) }}</p>
      </div>
      <div class="count-score">
        <div class="stars-score">
          <template v-for="(star, index) in getStarRating(averageScore)" :key="`average_${index}`">
            <img :src="star.icon === 'star' ? '/profile/full-star.png' : star.icon === 'star_half' ? '/profile/half-star.png' : '/profile/none-star.png'" alt="Star">
          </template>
        </div>
        <p>{{ totalReviews }} Reseña(s)</p>
      </div>
      <div class="progress-score">
        <template v-for="rating in ratings" :key="rating.score">
          <div class="individual-progress-bar">
            <div class="progress-bar-review">
              <pv-progress-bar :value="rating.percentage" :showValue="false"></pv-progress-bar>
            </div>
            <div class="info-progress-bar">
              <span style="margin-left: 10px;">{{ rating.score }}</span>
              <img src="../../../public/profile/full-star.png" alt="stars">
            </div>
          </div>
          <br>
        </template>
      </div>
    </div>
    <div class="line-text">
      <div class="line"></div>
    </div>
  </div>
  <div class="cards-section-title">
    <p>Opiniones destacadas:</p>
  </div>
  <div class="reviews-cards-container">
    <template v-for="review in myReviews" :key="review.id">
      <div class="container-reviews">
        <div class="example-card">
          <div class="container-image">
            <img :src="review.setGiveUserImg">
          </div>
          <div class="cards-text-content">
            <div class="card-header">
              <div class="card-title">{{ review.setGiveUserName }}</div>
              <div class="stars">
                <template v-for="(star, index) in getStarIcons(review.score)" :key="`review_${review.id}_${index}`">
                  <img :src="star.icon === 'complete' ? '/public/profile/full-star.png' : star.icon === 'completed' ? '/public/profile/half-star.png' : '/public/profile/none-star.png'" alt="Star" style="width:20px; height:20px">
                </template>
              </div>
            </div>
            <div class="card-review-content">
              <p>{{ review.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style>
.p-progressbar {
  border: 0 none;
  height: 3px;
  background: #000000;
  border-radius: 6px;
}
.p-progressbar .p-progressbar-value {
  border: 0 none;
  margin: 0;
  background: #FFD146;
}

.progress-bar-review{
  width: 90%;
}
.info-progress-bar{
  width: 10%;
  display:flex;
  justify-content:center;
  align-items: center;
  flex-direction:row;
}
.reviews-title{
  font-size: 1.5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: bolder;
  padding-top: 4rem;
  padding-left: 3rem;
  padding-bottom: 1rem;
  text-align: left;
}
.line-text{
  display: flex;
  align-items: center;
  align-content: center;
}
.line {
  margin-bottom: 0.5rem;
  flex: 1;
  height: 1px;
  background-color: #C2C2C2;
  margin-left: 3rem;
  margin-right: 3rem;
}
.cards-section-title{
  font-size: 1.5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: bolder;
  padding-left: 3rem;
  padding-top: 1.5rem;
  padding-bottom: 1rem;
  text-align: left;
}

.example-card {
  width: 100%;
  text-align: justify;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  background-color:white;
}

.container-image{
  overflow: auto;
  border: 3px solid #fac500;
  width: 100px;
  height: 100px;
  border-radius:50%;
  flex-shrink: 0;
}

.container-image img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.reviews-cards-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 3rem 3rem 5rem 3rem;
  gap: 2rem;
}
.individual-progress-bar{
  display: flex;
  align-items:center;
}
.card-header{
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.card-title{
  font-size: 1.5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: bolder;
}

.container-reviews{
  display: flex;
  flex-direction: row;
  height: auto;
  width: auto;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3);
  flex: 0 0 calc(50% - 20px);
}

.stars{
  margin: 0;
  display: flex;
  flex-direction:row;
  align-items: flex-start;
}

.stars-score{
  display:flex;
  flex-direction:row;
  justify-content: center;
}
.stars-score img{
  width: 30px;
  height: 30px;
  margin-right: 5px;
}

.card-review-content{
  align-content: center;
  font-size: 1rem;
  display: block;
  padding: 18px;
  line-height: 1.5rem;
  font-family: 'Montserrat', sans-serif;
  padding-top: 0.5rem;

}

.cards-text-content{
  width: 100%;
  height: 100%;
}

.average-score{
  font-size: 5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: bolder;
  padding: 3rem;
  align-content: center;
  align-items: center;
  color: #fac500;
}
.count-score{
  font-size: 1.2rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: bolder;
  padding: 1rem;
  align-content: center;
  text-align: center;
  width: 30%;
}
.count-score p{
  padding-top: 0.8rem;
}

.individual-progress-bar img{
  width: 18px;
  height: 18px;
  margin-left: 5px;
}

.analytics{
  display: flex;
  flex-direction: row;
  padding-top: 2rem;
  padding-bottom: 2rem;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.progress-score{
  width: 40%;
  text-align: center;
  justify-content: center;
}


@media screen and (max-width: 1150px){
  .container-reviews{
    width: 100%;
  }
  .reviews-title{
    padding-top: 2rem;
    padding-left: 1rem;
  }
  .cards-section-title{
    padding-left: 1rem;
    padding-top: 2rem;
  }
  .reviews-cards-container{
    padding: 1rem 1rem 3rem 1rem;
  }
  .container-reviews{
    flex: 0 0 calc(100%);
  }
  .card-header{
    display: flex;
    flex-direction: column;
  }
  .stars{
    align-items: center;
    padding-top: 1.5rem;
  }
  .analytics{
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
    padding-bottom: 2rem;
    align-items: center;
  }
}

@media screen and (max-width: 360px){
  .card-review-content{
    align-content: center;
    line-height: 1.5rem;
    font-family: 'Montserrat', sans-serif;
    padding-top: 0.5rem;
  }
  .example-card{
    padding: 0.5rem;
  }
}

@media screen and (max-width: 584px){
  .count-score{
    width: 100%;
  }
  .progress-score{
    width: 50%;
  }
  .individual-progress-bar{
    display: flex;
    flex-direction: column;
    align-items:center;
  }
}

</style>