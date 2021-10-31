import UU5 from "uu5g04";
import UuFrontendOneUu5lib from "uu_frontendOneg01-uu5lib";

const { shallow } = UU5.Test.Tools;

describe(`UuFrontendOneUu5lib.Bookdetail`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuFrontendOneUu5lib.Bookdetail />);
    expect(wrapper).toMatchSnapshot();
  });
});
