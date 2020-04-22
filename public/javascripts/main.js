 $(document).ready(function() {
    
    $('.punishment-item').click(function() {
        $('#punishment-dropdown').attr('value', $(this).attr('value'))
        $('#punishment-label').html($(this).html())
    })

    $('.crime-item').click(function() {
        $('#crime-dropdown').attr('value', $(this).attr('value'))
        $('#crime-label').html($(this).html())
    })

    $('.verdict-item').click(function() {
        $('#verdict-dropdown').attr('value', $(this).attr('value'))
        $('#verdict-label').html($(this).html())
    })

    $('#submit').click(() => {
        let crime = $('#crime-dropdown').attr('value')
        let punishment = $('#punishment-dropdown').attr('value')
        let verdict = $('#verdict-dropdown').attr('value')
        let fromYear = $('#year-from').val()
        let toYear = $('#year-to').val()

        console.log(crime)
        console.log(punishment)
        console.log(verdict)
        console.log(fromYear)
        console.log(toYear)
        
        let xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                jsonData = JSON.parse(this.responseText)

                console.log(jsonData)

                let data = {
                    labels: jsonData.years,
                    series: [
                        jsonData.data
                    ]
                }

                let options = {
                    plugins: [
                        Chartist.plugins.tooltip()
                    ]
                }
                new Chartist.Bar('.ct-chart', data, options)
            }
        }
        xhttp.open("GET", `get_data?crime=${crime}&punishment=${punishment}&year_from=${fromYear}&year_to=${toYear}&verdict=${verdict}`, false)
        xhttp.send()
    })
})