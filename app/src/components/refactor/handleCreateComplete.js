import { withHandlers } from 'recompose';


const handleCreateComplete = (props) => {
  props.setOpen(!props.open);
  props.commentCreated()
}