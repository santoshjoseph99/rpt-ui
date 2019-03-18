import React from 'react';
import { compose } from 'recompose';
import TimeAgo from 'react-timeago';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    margin: theme.spacing.unit * 2,
    maxWidth: 400
  }
});

const enhanced = compose(withStyles(styles));

export default enhanced(({ classes, message, createdAt }) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        <TimeAgo date={createdAt} />
      </Typography>
      <Typography variant="h5" component="h2">
        {message}
      </Typography>
    </CardContent>
  </Card>
));
