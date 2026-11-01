function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');

    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !message) {
            formMessage.textContent = 'Please fill in all fields.';
            return;
        }

        if (!emailPattern.test(email)) {
            formMessage.textContent = 'Please enter a valid email address.';
            return;
        }

        formMessage.textContent = 'Thank you! Your message has been submitted.';
        contactForm.reset();
    });
}
//======= ASSIGNMENT 3: GITHUB API INTEGRATION =======//

const githubUsername = 'Alvin442008';
const githubRepoList = document.getElementById('githubRepoList');
const githubStatus = document.getElementById('githubStatus');

async function fetchGitHubRepos() {
    if (!githubRepoList || !githubStatus) return;

    githubStatus.textContent = 'Loading GitHub repositories...';

    try {
        const response = await fetch(
            `https://api.github.com/users/${githubUsername}/repos`
        );

        if (!response.ok) {
            throw new Error('GitHub request failed');
        }

        const repos = await response.json();

        githubRepoList.replaceChildren();

        if (repos.length === 0) {
            githubStatus.textContent = 'No public repositories found.';
            return;
        }

        repos.forEach(repo => {
            const repoCard = document.createElement('div');
            repoCard.className = 'project-card';

            const heading = document.createElement('h3');
            heading.textContent = repo.name;

            const description = document.createElement('p');
            description.textContent =
                repo.description || 'No description available.';

            const link = document.createElement('a');
            link.textContent = 'View Repository';
            link.href = repo.html_url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';

            repoCard.append(heading, description, link);
            githubRepoList.appendChild(repoCard);
        });

        githubStatus.textContent =
            'GitHub repositories loaded successfully.';

    } catch (error) {
        githubStatus.textContent =
            'Unable to load GitHub repositories. Please try again later.';
        console.error(error);
    }
}

fetchGitHubRepos();