const params = (new URL(document.location)).searchParams

    if (params) {
      const meat = params.get('meat')
      const broth = params.get('broth')

      fetch(`https://front-br-challenges.web.app/api/v1/ramen-go/?meat=${meat}&broth=${broth}`)
        .then(res => res.json())
        .then(res => {
          console.log(res.data)
          if (res.data) {

            const illustration = document.getElementById('success-illustration')
            const image = document.createElement('img')

            image.setAttribute('src', res.data.image)
            image.setAttribute('alt', 'Imagem do prato')
            image.setAttribute('id', 'order-image')
            meat !== 'chasu' &&
              image.setAttribute('class', meat === 'karaague' ? 'karaague-size-fix' : 'yasai-size-fix')
            illustration.appendChild(image)

            document.getElementById('order-name').innerText = res.data.name
            document.getElementById('success-title').hidden = false

            document.getElementById('loading').style.display = 'none'
          }
        })
    }

    document.getElementById('btn-order').onclick = function () {
      window.location.href = 'index.html'
      return false
    }