const resume = document.querySelectorAll('.resume');
const datePost = document.querySelectorAll('.date-post')

resume.forEach(resumo => {
    resumo.textContent = resumo.textContent.substr(0,100)+'...'
});


datePost.forEach(data => {
    data.textContent = 'Postado em '+moment(data.textContent).format('DD/MM/YYYY');
})

