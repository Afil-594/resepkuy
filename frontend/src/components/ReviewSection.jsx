    // frontend/src/components/ReviewSection.jsx
    import React, { useState, useEffect } from 'react';
    import { getReviewsAPI, addReviewAPI } from '../services/api'; // Fungsi API yang sudah kita buat
    import { FaStar } from 'react-icons/fa'; // Ikon bintang

    const ReviewSection = ({ recipeId }) => {
      const [reviews, setReviews] = useState([]);
      const [isLoadingReviews, setIsLoadingReviews] = useState(false);
      const [errorReviews, setErrorReviews] = useState('');

      // State untuk form review baru
      const [username, setUsername] = useState('');
      const [rating, setRating] = useState(0); // 0 berarti belum ada rating dipilih
      const [hoverRating, setHoverRating] = useState(0); // Untuk efek hover pada bintang
      const [comment, setComment] = useState('');
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [submitError, setSubmitError] = useState('');
      const [submitSuccess, setSubmitSuccess] = useState('');

      // Fungsi untuk mengambil review
      const fetchReviews = async () => {
        if (!recipeId) return;
        setIsLoadingReviews(true);
        setErrorReviews('');
        try {
          const response = await getReviewsAPI(recipeId);
          setReviews(response.data);
        } catch (err) {
          console.error("Error fetching reviews:", err);
          setErrorReviews('Gagal memuat ulasan. Coba segarkan halaman.');
        } finally {
          setIsLoadingReviews(false);
        }
      };

      // Ambil review saat komponen dimuat atau recipeId berubah
      useEffect(() => {
        fetchReviews();
      }, [recipeId]);

      const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
          setSubmitError('Rating bintang tidak boleh kosong.');
          return;
        }
        if (!username.trim() || !comment.trim()) {
          setSubmitError('Nama dan komentar tidak boleh kosong.');
          return;
        }

        setIsSubmitting(true);
        setSubmitError('');
        setSubmitSuccess('');
        try {
          await addReviewAPI(recipeId, { username, rating, comment });
          setSubmitSuccess('Ulasan Anda berhasil dikirim!');
          // Reset form
          setUsername('');
          setRating(0);
          setComment('');
          // Ambil ulang daftar review untuk menampilkan yang baru
          fetchReviews();
        } catch (err) {
          console.error("Error submitting review:", err);
          setSubmitError(err.response?.data?.message || 'Gagal mengirim ulasan. Coba lagi.');
        } finally {
          setIsSubmitting(false);
        }
      };

      return (
        <div style={sectionContainerStyle}>
          <h2 style={mainTitleStyle}>Ulasan Pengguna ({reviews.length})</h2>

          {/* Form untuk menambah review baru */}
          <div style={formContainerStyle}>
            <h3 style={subTitleStyle}>Bagikan Pendapat Anda!</h3>
            <form onSubmit={handleReviewSubmit}>
              <div style={formGroupStyle}>
                <label htmlFor="username" style={labelStyle}>Nama:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Rating:</label>
                <div style={starContainerStyle}>
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <FaStar
                      key={starValue}
                      style={{
                        ...starStyle,
                        color: (hoverRating || rating) >= starValue ? '#ffc107' : '#e4e5e9',
                      }}
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHoverRating(starValue)}
                      onMouseLeave={() => setHoverRating(0)}
                    />
                  ))}
                </div>
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="comment" style={labelStyle}>Komentar:</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows="4"
                  style={textareaStyle}
                  required
                ></textarea>
              </div>

              {submitError && <p style={errorMessageStyle}>{submitError}</p>}
              {submitSuccess && <p style={successMessageStyle}>{submitSuccess}</p>}

              <button type="submit" disabled={isSubmitting} style={submitButtonStyle}>
                {isSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}
              </button>
            </form>
          </div>

          {/* Daftar review yang sudah ada */}
          <div style={reviewListContainerStyle}>
            <h3 style={subTitleStyle}>Apa Kata Mereka:</h3>
            {isLoadingReviews && <p>Memuat ulasan...</p>}
            {errorReviews && <p style={errorMessageStyle}>{errorReviews}</p>}
            {!isLoadingReviews && !errorReviews && reviews.length === 0 && (
              <p>Belum ada ulasan untuk resep ini. Jadilah yang pertama!</p>
            )}
            {!isLoadingReviews && !errorReviews && reviews.length > 0 && (
              <div style={reviewsGridStyle}>
                {reviews.map((review) => (
                  <div key={review._id} style={reviewCardStyle}>
                    <div style={reviewHeaderStyle}>
                      <strong style={reviewUsernameStyle}>{review.username}</strong>
                      <div style={reviewRatingStyle}>
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} color={i < review.rating ? '#ffc107' : '#e4e5e9'} />
                        ))}
                      </div>
                    </div>
                    <p style={reviewCommentStyle}>{review.comment}</p>
                    <small style={reviewTimestampStyle}>
                      {new Date(review.timestamp).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </small>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    };

    // Styling
    const sectionContainerStyle = { marginTop: '40px', paddingTop: '30px', borderTop: '1px solid #eee' };
    const mainTitleStyle = { fontSize: '1.8rem', color: '#333', marginBottom: '20px' };
    const subTitleStyle = { fontSize: '1.4rem', color: '#444', marginBottom: '15px' };

    const formContainerStyle = { marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #e0e0e0' };
    const formGroupStyle = { marginBottom: '15px' };
    const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: '500', color: '#555' };
    const inputStyle = { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' };
    const textareaStyle = { ...inputStyle, resize: 'vertical' };
    const starContainerStyle = { display: 'flex', gap: '5px' };
    const starStyle = { cursor: 'pointer', fontSize: '1.8rem', transition: 'color 0.2s' };
    const submitButtonStyle = { backgroundColor: '#28a745', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', opacity: 1 };
    // const submitButtonDisabledStyle = { ...submitButtonStyle, opacity: 0.6, cursor: 'not-allowed' }; // Bisa dikombinasikan dengan disabled prop

    const reviewListContainerStyle = { marginTop: '20px' };
    const reviewsGridStyle = { display: 'grid', gap: '15px', gridTemplateColumns: '1fr' }; // Satu kolom untuk review
    const reviewCardStyle = { border: '1px solid #e0e0e0', borderRadius: '6px', padding: '15px', backgroundColor: '#fff' };
    const reviewHeaderStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' };
    const reviewUsernameStyle = { fontWeight: 'bold', color: '#333' };
    const reviewRatingStyle = { display: 'flex' };
    const reviewCommentStyle = { color: '#555', lineHeight: '1.5', marginBottom: '8px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' };
    const reviewTimestampStyle = { fontSize: '0.8rem', color: '#777' };

    const errorMessageStyle = { color: 'red', fontSize: '0.9rem', marginTop: '10px' };
    const successMessageStyle = { color: 'green', fontSize: '0.9rem', marginTop: '10px' };


    export default ReviewSection;
    