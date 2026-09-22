(function () {
  var button = document.getElementById('load-more-btn');
  var grid = document.getElementById('recipe-grid');
  var errorMessage = document.getElementById('load-more-error');

  if (!button || !grid) {
    return;
  }

  var offset = parseInt(button.getAttribute('data-offset'), 10) || 0;
  var total = parseInt(button.getAttribute('data-total'), 10) || 0;
  var limit = 3;
  var isLoading = false;

  function hideButton() {
    button.hidden = true;
    button.disabled = true;
  }

  function showError(message) {
    if (!errorMessage) {
      return;
    }
    errorMessage.textContent = message;
    errorMessage.hidden = false;
  }

  function clearError() {
    if (!errorMessage) {
      return;
    }
    errorMessage.textContent = '';
    errorMessage.hidden = true;
  }

  function previewText(review) {
    if (!review) {
      return '';
    }
    if (review.length > 120) {
      return review.substring(0, 120) + '...';
    }
    return review;
  }

  function createRecipeCard(post) {
    var article = document.createElement('article');
    article.className = 'recipe-card';

    var title = document.createElement('h2');
    title.textContent = post.title;
    article.appendChild(title);

    var meta = document.createElement('p');
    meta.className = 'meta';

    var rating = document.createElement('span');
    rating.className = 'rating';
    rating.textContent = 'Rating: ' + post.rating + '/5';
    meta.appendChild(rating);

    var date = document.createElement('span');
    date.className = 'date';
    date.textContent = post.created_at;
    meta.appendChild(date);

    article.appendChild(meta);

    var preview = document.createElement('p');
    preview.className = 'card-preview';
    preview.textContent = previewText(post.review);
    article.appendChild(preview);

    var link = document.createElement('a');
    link.className = 'btn btn-primary';
    link.href = '/posts/' + post.id;
    link.textContent = 'Read Recipe';
    article.appendChild(link);

    return article;
  }

  button.addEventListener('click', function () {
    if (isLoading) {
      return;
    }

    clearError();
    isLoading = true;
    button.disabled = true;
    button.textContent = 'Loading...';

    fetch('/api/recipes?offset=' + offset + '&limit=' + limit)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Request failed');
        }
        return response.json();
      })
      .then(function (data) {
        var posts = data.posts || [];

        posts.forEach(function (post) {
          grid.appendChild(createRecipeCard(post));
        });

        offset = offset + posts.length;
        total = typeof data.total === 'number' ? data.total : total;
        button.setAttribute('data-offset', String(offset));
        button.setAttribute('data-total', String(total));

        if (offset >= total || posts.length === 0) {
          hideButton();
        } else {
          button.disabled = false;
          button.textContent = 'Load More Recipes';
        }
      })
      .catch(function () {
        showError('Could not load more recipes. Please try again.');
        button.disabled = false;
        button.textContent = 'Load More Recipes';
      })
      .finally(function () {
        isLoading = false;
      });
  });
})();
