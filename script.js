let userContainer = document.querySelector('.users-wrapper');
let paginationNumbers = document.querySelector('.pagination')

let btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
    btn.disabled = true
    fetch('https://62b18776c7e53744afbb18d4.mockapi.io/users')
    .then(response => {
        console.log(response)
        return response.json()
    })
    .then(data => {
        console.log(data)
        let users = data;
        let paginationLimit = 3;
        let currentPage;
        let pageCount = Math.ceil(users.length / paginationLimit);


        const appendPageNumber = (index) => {
            const pageNumber = document.createElement("button");
            pageNumber.className = "pagination-number";
            pageNumber.innerHTML = index;
            pageNumber.setAttribute("page-index", index);
            pageNumber.setAttribute("aria-label", "Page " + index);
            
            paginationNumbers.appendChild(pageNumber);
        }

        const getPaginationNumbers = () => {
            for (let i = 1; i <= pageCount; i++) {
                appendPageNumber(i);
            }
        };
        

        const handleActivePageNumber = () => {
        let allBtns = document.querySelectorAll('.pagination-number');
        for(const btn of allBtns){
            btn.classList.remove('active');
            const pageIndex = Number(btn.getAttribute("page-index"));
            if (pageIndex == currentPage) {
            btn.classList.add("active");
            }
        }
        };

        const setCurrentPage = (pageNum) => {
            currentPage = pageNum;

            handleActivePageNumber();

            const prevRange = (pageNum - 1) * paginationLimit;
            const currRange = pageNum * paginationLimit;
            
            users.forEach((pom, index) => {
                if (index >= prevRange && index < currRange) {
                    let userCard = document.createElement('div');
                    userCard.classList.add('user-card');
                    let firstName = document.createElement('span');
                    firstName.textContent = pom.username
                    let lastName = document.createElement('span');
                    lastName.textContent = pom.id
                    let email = document.createElement('span');
                    email.textContent = pom.email
                    userCard.appendChild(firstName);
                    userCard.appendChild(lastName);
                    userCard.appendChild(email);
                    userContainer.appendChild(userCard)
                }
            });
        };

        getPaginationNumbers();
        setCurrentPage(1);

        let start = 0;
        let limit = 3;

        let allBtns = document.querySelectorAll('.pagination-number');
        for(const btn of allBtns){
            btn.addEventListener('click', () => {
                userContainer.innerHTML = ''
                setCurrentPage(Number(btn.getAttribute('page-index')))
            })
        }
    });
})

