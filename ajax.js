let barChartData = {
            labels: JSON.parse('{!! $month_names !!}'),
            datasets: [{
                label: 'تعداد نظرات',
                backgroundColor: 'red',
                borderColor: 'red',
                borderWidth: 1,
                data: JSON.parse('{!! $comments_count !!}')
            },
            ]
        };

window.onload = function() {
            let ctx = document.getElementById('example-chart').getContext('2d');
            let YearMontChart = new Chart(ctx, {
                type: 'bar',
                data: barChartData,
                options: {
                    responsive: true,
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Bar Chart'
                    }
                }
            });

            $('#update-chart').on('click', function (){
                updateYearMonthCart();
            });

            let updateYearMonthCart = function (){
                $.ajax({
                    type: 'post',
                    url: '{{ route("admin.getCommentsInYearByMonth") }}',
                    data: {
                        _token: _token
                    },
                    success: function (data){
                        let comments_count = data.comments_count,
                            month_names = data.month_names;
                        YearMontChart.data.labels = month_names;
                        YearMontChart.data.datasets[0].data = comments_count;
                        YearMontChart.update();
                    }
                });
            }
        };
