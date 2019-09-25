import React from 'react';
import Header from '../src/element/header';
import './App.css';
import knifeimg from '../src/knife_banner.png'

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
          <div className="slider_image">
            <div id="c506" className="component_ContentDisplay_Content">
              <div className="plain_content">
                <h1 ><span >RECIPE INSPIRATION FOR  EVERY OCCASION</span></h1>
                <h4 >
                  <span >
                    <strong>
                        <img align="baseline" alt="knife banner" height="27" src={knifeimg} title="knife banner" width="711"/>
                        </strong>
                      </span>
                </h4>
  
              <h4 ><span >Search hundreds of iron rich beef and lamb recipes</span></h4>
            </div>
          </div>
         </div>
          
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
                              <h5 className='slider__title'>{el.title}</h5>
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
