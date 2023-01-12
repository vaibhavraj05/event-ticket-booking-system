const models = require("../models");
const { sequelize } = require("../models");

const getShowType = async (payload) => {
  try {
    const event = await models.Event.findOne({
      where: { id: payload.eventId },
    });
    if (!event) {
      throw new Error("Event does not exist ");
    }

    return ` event_type : ${event.eventType} `;
  } catch (error) {
    return { data: null, error: error };
  }
};
const createShow = async (payload) => {
  try {
    const event = await models.Event.findOne({
      where: { id: payload.eventId },
    });
    if (!event) {
      throw new Error("Event does not exist ");
    }
    if (event.eventType == "movie") {
      const audi = await models.Movie.findOne({
        where: { audi_id: payload.audiId },
      });

      if (audi) {
        throw new Error("Audi already exists");
      }
      const movie = await models.Movie.create(payload);
      return "movie show has successfully created";
    } else if (event.eventType == "concert") {
      const audi = await models.Concert.findOne({
        where: { audi_id: payload.audiId },
      });
      if (audi) {
        throw new Error("Audi already exists");
      }
      const concert = await models.Concert.create(payload);
      return "concert show has successfully created";
    } else {
      return "Event Type is not correct";
    }
  } catch (error) {
    return { data: null, error: error };
  }
};

const getMovieDetails = async (payload) => {
  const trans = await sequelize.transaction();
  try {
    const address = await models.Address.findOne(
      {
        where: { pin_code: payload.pinCode },
      },
      { transaction: trans }
    );
    if (!address) {
      throw new Error("Address does not exists");
    }
    const theatre = await models.Theatre.findOne(
      {
        where: {
          address_id: address.id,
        },
      },
      { transaction: trans }
    );
    if (!theatre) {
      throw new Error("Theatre does not exists");
    }
    const audi = await models.Audi.findAll(
      {
        where: {
          theatre_id: theatre.id,
        },
      },
      { transaction: trans }
    );
    if (!audi[0]) {
      throw new Error("Audi does not exists");
    }

    let movies = [];
    for (let i = 0; i < audi.length; i++) {
      const movie = await models.Movie.findOne(
        {
          attributes: {
            exclude: [
              "created_at",
              "updated_at",
              "deleted_at",
              "audi_id",
              "event_id",
            ],
          },
          where: {
            audi_id: audi[i].id,
          },
        },
        { transaction: trans }
      );
      if (!movie) continue;
      else {
        const show = {
          movieName: movie.movieName,
          movieDesc: movie.movieDesc,
          movieCrew: movie.movieCrew,
          movieDuration: movie.movieDuration,
          movieLanguage: movie.movieLanguage,
          movieDate: movie.movieDate,
          startTime: movie.startTime,
          endTime: movie.endTime,
        };
        movies.push(show);
      }
    }
    await trans.commit();
    return movies;
  } catch (error) {
    await trans.rollback();
    return { data: null, error: error };
  }
};

const getConcertDetails = async (payload) => {
  const trans = await sequelize.transaction();
  try {
    const address = await models.Address.findOne(
      {
        where: { pin_code: payload.pinCode },
      },
      { transaction: trans }
    );
    if (!address) {
      throw new Error("Address does not exists");
    }
    const theatre = await models.Theatre.findOne(
      {
        where: {
          address_id: address.id,
        },
      },
      { transaction: trans }
    );
    if (!theatre) {
      throw new Error("Theatre does not exists");
    }
    const audi = await models.Audi.findAll(
      {
        where: {
          theatre_id: theatre.id,
        },
      },
      { transaction: trans }
    );
    if (!audi[0]) {
      throw new Error("Audi does not exists");
    }

    let movies = [];
    for (let i = 0; i < audi.length; i++) {
      const concert = await models.Concert.findOne(
        {
          attributes: {
            exclude: [
              "created_at",
              "updated_at",
              "deleted_at",
              "audi_id",
              "event_id",
            ],
          },
          where: {
            audi_id: audi[i].id,
          },
        },
        { transaction: trans }
      );
      if (!concert) continue;
      else {
        const show = {
          concertName: concert.concertName,
          artistName: concert.artistName,
          concertGenre: concert.concertGenre,
          concertDuration: concert.concertDuration,
          concertLanguage: concert.concertLanguage,
          concertDate: concert.concertDate,
        };
        movies.push(show);
      }
    }
    await trans.commit();
    return movies;
  } catch (error) {
    await trans.rollback();
    return { data: null, error: error };
  }
};

const deleteMovie = async (payload) => {
  try {
    const movie = await models.Movie.destroy({
      where: { id: payload.movieId },
    });
    if (!movie) {
      throw new Error("Movie does not exist ");
    }
    return "movie has successfully deleted ";
  } catch (error) {
    return { data: null, error: error };
  }
};
const deleteConcert = async (payload) => {
  try {
    const concert = await models.Concert.destroy({
      where: { id: payload.concertId },
    });
    if (!concert) {
      throw new Error("Concert does not exist ");
    }
    return "concert has successfully deleted ";
  } catch (error) {
    return { data: null, error: error };
  }
};

const updateMovie = async (payload) => {
  try {
    const movie = await models.Movie.update(
      {
        movieDesc: payload.movieDesc,
        movieCrew: payload.movieCrew,
        startTime: payload.startTime,
        endTime: payload.endTime,
        movieName: payload.movieName,
        movieDuration: payload.movieDuration,
        movieLanguage: payload.movieLanguage,
        movieDate: payload.movieDate,
      },
      { where: { id: payload.movieId } }
    );
    console.log(movie);
    if (!movie) {
      throw new Error("Movie does not exist ");
    }
    return "movie has successfully updated ";
  } catch (error) {
    return { data: null, error: error };
  }
};

const updateConcert = async (payload) => {
  try {
    const concert = await models.Concert.update(
      {
        concert_name: payload.concertName,
        concert_duration: payload.concertDuration,
        concert_language: payload.concertLanguage,
        concert_date: payload.concertDate,
        artist_name: payload.artistName,
        concert_genre: payload.concertGenre,
      },
      { where: { id: payload.concertId } }
    );
    if (!concert) {
      throw new Error("Concert does not exist ");
    }
    return "concert has successfully updated ";
  } catch (error) {
    return { data: null, error: error };
  }
};

module.exports = {
  createShow,
  getShowType,
  getMovieDetails,
  getConcertDetails,
  deleteMovie,
  updateMovie,
  deleteConcert,
  updateConcert,
};
