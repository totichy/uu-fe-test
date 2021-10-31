//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Lsi from "./book-lsi.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BookUpdateForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const BookUpdateForm = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    shown: UU5.PropTypes.bool,
    selectedBook: UU5.PropTypes.object,
    setFormOpened: UU5.PropTypes.func,
    setSelectedBook: UU5.PropTypes.func,
    handleCreateBook: UU5.PropTypes.func,
    handleUpdateBook: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    function handleOnSave(opt) {
      if (props.selectedBook?.id) props.handleUpdateBook({ id: props.selectedBook.id, ...opt.values });
      else props.handleCreateBook(opt.values);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    console.log(props.selectedBook);
    return currentNestingLevel ? (
      <div {...attrs}>
        <UU5.Bricks.Modal
          header={<UU5.Bricks.Lsi lsi={props.selectedBook?.id ? Lsi.updateBook : Lsi.createBook} />}
          shown={props.selectedBook}
          onClose={() => props.setSelectedBook(null)}
        >
          <UU5.Forms.Form
            labelColWidth={"xs-12 s-12 m-6 l-3 xl-3"}
            valueColWidth={"xs-12 s-12 m-8 l-7 xl-7"}
            onCancel={() => props.setSelectedBook(null)}
            onSave={handleOnSave}
          >
            <UU5.Forms.Text label={<UU5.Bricks.Lsi lsi={Lsi.name} />} value={props.selectedBook?.name || ""} />
            <UU5.Forms.Text label={<UU5.Bricks.Lsi lsi={Lsi.author} />} value={props.selectedBook?.author || ""} />
            <UU5.Forms.Text label={<UU5.Bricks.Lsi lsi={Lsi.cover} />} value={props.selectedBook?.cover || ""} />
            <UU5.Bricks.Line size={"5"} />
            <UU5.Forms.Controls />
          </UU5.Forms.Form>
        </UU5.Bricks.Modal>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default BookUpdateForm;
