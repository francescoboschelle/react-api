import { useEffect, useState } from "react";

export default function App() {
  const [fullData, setFullData] = useState(null);
  const [displayedData, setDisplayedData] = useState(null);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    async function fetchUrl() {
      const fetchedData = [];
      await fetch("https://lanciweb.github.io/demo/api/actresses/")
        .then((res) => res.json())
        .then((data) => fetchedData.push(...data));

      await fetch("https://lanciweb.github.io/demo/api/actors/")
        .then((res) => res.json())
        .then((data) => fetchedData.push(...data));

      setFullData(fetchedData);
    }
    fetchUrl();
  }, []);

  useEffect(() => {
    let filteredData;
    if (filter) {
      filteredData = fullData.filter((actor) =>
        actor.name.toLowerCase().startsWith(filter)
      );
    } else if (filter === "") {
      setFilter(null);
      filteredData = fullData;
    } else {
      filteredData = fullData;
    }

    setDisplayedData(filteredData);
  }, [fullData, filter]);

  return (
    <>
      <div className="container mt-5 mb-5">
        <h1 className="text-center">Lista Attori & Attrici</h1>
        <div className="mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            name=""
            id=""
            aria-describedby="helpId"
            placeholder="Filtra per nome"
            onChange={(e) => setFilter(e.target.value.toLowerCase())}
          />
        </div>

        <hr />

        <section>
          <div className="container">
            <div className="row justify-content-center g-2">
              {displayedData &&
                displayedData?.map((actress, index) => {
                  return (
                    <div className="col-4" key={`actress:${index}`}>
                      <div className="card h-100">
                        <img
                          className="card-img-top object-fit-cover"
                          style={{ aspectRatio: 1 / 1 }}
                          src={actress.image}
                          alt={actress.name}
                        />
                        <div className="card-body d-flex flex-column justify-content-between h-100">
                          <h4 className="card-title">{actress.name}</h4>
                          <p className="card-text">{actress.biography}</p>
                          <div className="table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">Born</th>
                                  <th scope="col">Awards</th>
                                  <th scope="col">Nationality</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="">
                                  <td scope="row">{actress.birth_year}</td>
                                  <td>{actress.awards}</td>
                                  <td>{actress.nationality}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <ul className="list-group list-group-numbered">
                            <p className="card-text">
                              <strong>Most famous movies:</strong>
                            </p>
                            {actress.most_famous_movies?.map(
                              (movie, movIndex) => {
                                return (
                                  <li
                                    className="list-group-item"
                                    key={`movie:${index}:${movIndex}`}
                                  >
                                    {movie}
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
