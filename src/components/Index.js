import React, { Component } from 'react';
import { Image, Grid, Segment } from 'semantic-ui-react';

class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="slider margin-bottom">
          <div className="slider-bottom"/>
          <Grid className="margin-top">
            <Grid.Row>
              <Grid.Column mobile={16} tablet={10} computer={10}>
                <div className="slider-texte margin-top">
                  <Image
                    centered
                    className="slider-logo"
                    src="media/travelnode.svg"
                  />
                  <p>Velit doloribus alias et iusto cumque.</p>
                </div>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={6} computer={6}>
                <img
                  className="mac"
                  src="media/mac.svg"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <Grid>
          <Grid.Row className="margin-bottom">
            <Grid.Column mobile={16} tablet={16} computer={6}>
              <div className="mockup">
                <Image
                  centered
                  className="mac-left"
                  src="media/img/mac-left.png"
                />
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={10} className="presentation">

              <Grid columns={3} >
                <Grid.Row stretched>
                  <Grid.Column>
                    <Segment className="item-presentation">
                      <Image
                        className="image-presentation"
                        centered
                        src="media/icons/beer.svg"
                      />
                      <h2>Pub</h2>
                      <p>Velit doloribus alias et iusto cumque. Sit sint deserunt molestiae quod suscipit illum quaerat.</p>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment className="item-presentation">
                      <Image
                        className="image-presentation"
                        centered
                        src="media/icons/cutlery.svg"
                      />
                      <h2>Restaurant</h2>
                      <p>Velit doloribus alias et iusto cumque. Sit sint deserunt molestiae quod suscipit illum quaerat.</p>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment className="item-presentation">
                      <Image
                        className="image-presentation"
                        centered
                        src="media/icons/map-of-roads.svg"
                      />
                      <h2>Itinéraire</h2>
                      <p>Velit doloribus alias et iusto cumque. Sit sint deserunt molestiae quod suscipit illum quaerat.</p>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row stretched>
                  <Grid.Column>
                    <Segment className="item-presentation">
                      <Image
                        className="image-presentation"
                        centered
                        src="media/icons/coffee-cup.svg"
                      />
                      <h2>Café</h2>
                      <p>Velit doloribus alias et iusto cumque. Sit sint deserunt molestiae quod suscipit illum quaerat.</p>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment className="item-presentation">
                      <Image
                        className="image-presentation"
                        centered
                        src="media/icons/cocktail.svg"
                      />
                      <h2>Bar</h2>
                      <p>Velit doloribus alias et iusto cumque. Sit sint deserunt molestiae quod suscipit illum quaerat.</p>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment className="item-presentation">
                      <Image
                        className="image-presentation"
                        centered
                        src="media/icons/bed.svg"
                      />
                      <h2>Hotel</h2>
                      <p>Velit doloribus alias et iusto cumque. Sit sint deserunt molestiae quod suscipit illum quaerat.</p>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={6} className="prensentation-pers">
              <img
                centered
                className="nodebleu"
                src="media/travelnodebleu.svg"
              />
              <p>Velit doloribus alias et iusto cumque.</p>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={10}>
              <Image
                className="image-presentation"
                src="media/img/perspective.png"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

Index.propTypes = {
  // includ there the props for typechecking
};

export default Index;

