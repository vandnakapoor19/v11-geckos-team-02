import React from 'react';
import Header from '../src/element/header';
import './App.css';

export default class PersonList extends React.Component {
  constructor(props) {
    super();

    this.state = {
      slider: [],
      isloaded: false,
      isrecipe: false,
      recipes:[],
    };
  }

  componentDidMount() {
    fetch(
      `https://api.spoonacular.com/recipes/search?apiKey=f9b13b6aea5248ec9afbeb7cb5a231f2&number=5&query=water`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          isloaded: true,
          slider: json,
          isrecipe: false,

        });
      });

    fetch(
      `https://api.spoonacular.com/recipes/search?apiKey=f9b13b6aea5248ec9afbeb7cb5a231f2&offset=6&number=16`
    )
      .then(res1 => res1.json())
      .then(json1 => {
        this.setState({
          recipes: json1,
          isrecipe: true
        });
      });
  }

  render() {
    var { isloaded, slider, recipes, isrecipe } = this.state;
    
    if (!isloaded) {
      return <div>Loading</div>;
    } else {
      const baseUri = slider.baseUri;
      return (    
        <div >
          {/* Showing header information here*/}
          <Header />
          {/* End header information here*/}

          {/* Showing slider information here*/}
          <div className='cards-sliders'>
            <div className='cards-slider-wrapper'>
              {slider.results.map(el => {
                return (
                  <article className='slider__slide' key={el.id}>
                    <a
                      data-carousel-link=''
                      data-internal-referrer='hp_carousel 01_Oktoberfest Recipes'
                      data-referring-position='carousel 01'
                      href={`${baseUri}${el.image}`}
                      target='_self /'
                    >
                      <div className='slider__text'>
                        <h5 className='slider__description'>{el.title}</h5>
                        <p className='slider__description'>
                          Prepration Time: {el.readyInMinutes} Minutes
                        </p>
                      </div>
                      <img key={el.id} src={`${baseUri}${el.image}`} />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
          {/* End slider information here*/}
          <div className="clear"></div>

          {/* Showing Content information here*/}
          {(!isrecipe)?'':
            <div className="recipes-item container">
              {recipes.results.map(el=>{
                      return (
                        <article className='slider__slide' key={el.id}>
                          <a
                            data-carousel-link=''
                            data-internal-referrer='hp_carousel 01_Oktoberfest Recipes'
                            data-referring-position='carousel 01'
                            href={`${baseUri}${el.image}`}
                            target='_self /'
                          >
                            <div className='slider__text'>
                              <h5 className='slider__description'>{el.title}</h5>
                              <p className='slider__description'>
                                Prepration Time: {el.readyInMinutes} Minutes
                              </p>
                            </div>
                            <img key={el.id} src={`${baseUri}${el.image}`} />
                          </a>
                        </article>
                      );
                    }
                )}
         `  </div> }
            
           
          
          
          {/* End Content Part From Here using the API*/}
        </div>
      );
    }
  }
}
