import emailjs from '@emailjs/browser';


export const fromAlphNum = (s) => {
    const myArray = s.split(/([0-9]+)/);
    return [myArray[0], myArray[1]];
}

export const sendEmail = (to, movieDetails) => {
    const templateParams = {
        to_email: to.email,
        to_name: to.name,
        booking_id: movieDetails.bookingId,
        movie_name: movieDetails.movieName,
        show_time:movieDetails.showTime,
        venue:movieDetails.venue+','+movieDetails.location,
        seat_num:movieDetails.seatNo.join(','),

    }
    return () => emailjs.send('service_4ifer1b', 'template_4kueif6', templateParams,'VzGzg59zWSBTTX8jM');
   
}
