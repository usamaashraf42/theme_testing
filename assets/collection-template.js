const filters = (() => {
    const filters = new Set();
    const view = 'ajax';
    const type = 'product';
    const node = { items: document.querySelectorAll('[data-filter]'), loadMoreBtns: document.querySelectorAll('[data-load-more-btn]') };
    const grid = document.querySelector('[data-cards]');
    let doc = null;
    let pagination = document.querySelector('[data-pagination]');
    let pages = parseInt(pagination.dataset.pages);
    let currentPage = 1;

    const init = () => {
        node.items.forEach(item => {
            item.addEventListener('change', handleFilterChange);
        });

        node.loadMoreBtns.forEach(btn => {
            btn.addEventListener('click', handleLoadMoreBtnClick);
        });
    };

    const handleLoadMoreBtnClick = async (event) => {
        currentPage++;
        await appendGrid();
        revealCards();
        updateLoadMoreBtnUI();
    };

    const replacePagination = () => {
        pagination.replaceWith(document.querySelector('[data-pagination]'));
        pagination = document.querySelector('[data-pagination]');
        pages = parseInt(pagination.dataset.pages);
    }

    const updateLoadMoreBtnUI = () => {
        const loadMoreBtn = document.querySelector('[data-load-more-btn]');
        
        if (pages === currentPage) {
            loadMoreBtn.classList.add('hide');
        } else {
            loadMoreBtn.classList.remove('hide');
        };
    };

    const appendGrid = async () => {
        const response = await request();
        const html = await response.text();
        doc = parse(html);
        grid.insertAdjacentHTML('beforeend', document.querySelector('[data-cards]').innerHTML);
    };

    const swapGrid = async () => {
        const response = await request();
        const html = await response.text();
        doc = parse(html);
        grid.innerHTML = document.querySelector('[data-cards]').innerHTML;
    };

    const handleFilterChange = async (event) => {
        currentPage = 1;
        filter(event.currentTarget.value);
        await swapGrid();
        replacePagination();
        injectQuantityCode();
        updateLoadMoreBtnUI();
        revealCards();
    };

    const injectQuantityCode = () => {
        $('.qtyplus').click(function(e){
            item_id = $(this).attr('id');
            var $el = $(this).prev()
            var currentVal = parseInt($el.val());
            if (!isNaN(currentVal)) {
                $el.val(currentVal + 1)
            } else {
                $el.val(1);
            }
        });

        $(".qtyminus").click(function(e) {
            var $el = $(this).next()
            var currentVal = parseInt($el.val());
            if (!isNaN(currentVal) && currentVal > 1) {
                $el.val(currentVal - 1);
            } else {
                $el.val(1);
            }
        });
    }; 

    const revealCards = () => {
        const cards = grid.querySelectorAll('.card');
        
        for (const card of cards) {
            // card.classList.add('card--reveal');
        }
    }

    const parse = (html) => {
        const parser = new DOMParser();
        return parser.parseFromString(html, 'text/html');
    };

    const filter = (value) => {
        filters.has(value) ? filters.delete(value) : filters.add(value);
    };

    const request = async () => {
        console.log(url());
        return fetch(url());
    };

    const url = () => {
        let query = '';
        filters.forEach((value) => query += ` OR tag:"${ value }"`);
        query = query.replace('OR ', '');
        return query ? `/search?q=${ query }&view=${ view }&type=${ type }&page=${ currentPage }` : `/collections/all?page=${ currentPage }`;
    };

    return {
        init
    }
})();

filters.init();