- i used three api calls:'https://restcountries.eu/rest/v2/all' to fetch all the countries and their details, and the 
openweathermap api to show the weather detail of the present day, and another call for the weather 
forecast for the next few HOURS, not days, with the openweathermap api also

- the openweathermap api doesn't allow me to make more than 60 api calls/min, so when you open the app at first hand,
you will get the display of only the 7 first capitals that were fetched with the 'restcountries', not all the capitals 
of the world. of course, you can search for another capital in the navbar, and display the results directly. However, to
search for a capital, you will need to write its name exactly as it is officialy stated in english to get the 
right response. ex: to search for washington, you wil need to type in the navbar search text field: 
'washington, D.C.' not only washington

- i did not make a 5 day weather forecast, simply because this feature isn't supported by the free 
version of the openweathermap api, instead, i chose to display the weather forecast for the next upcoming 15 hours
of the selected capital

- to view the details weather of a capital, you will need to click on its name in the table

- you can pin and unpin capitals to favorite by clicking on the stars displayed in the far right of the table

- to navigate between home and favorite section, you have to click on the home and star icons that are displayed
in the far left of the navbar

- you can't pin and unpin capitals when you are in the favorite section

- if you refresh your app, all the modification that you've made (ex: pining to favorite and searching for other capitals)
will be lost

-i did not make filters or any search options on any of the tables that are displayed
