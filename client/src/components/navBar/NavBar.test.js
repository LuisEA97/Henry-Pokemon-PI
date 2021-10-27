import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { MemoryRouter } from "react-router-dom";
import App from '../../main/App'
Enzyme.configure({ adapter: new Adapter() });

describe("<NavBar />", () => {
    let store;
    let wrapper;
    const mockStore = configureMockStore([thunk]);

    store = mockStore({});
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <Provider store={store}>
                    <NavBar/>
                </Provider>
            </BrowserRouter>
        )
    });
    it('Should have two <Link /> tags', () => {
        expect(wrapper.find(Link)).toHaveLength(2);
    })
    it('The first link should point to /home', () => {
        expect(wrapper.find(Link).at(0).prop("to")).toEqual("/home");
    })
    it('The second link should point to /home/create', () => {
        expect(wrapper.find(Link).at(1).prop("to")).toEqual("/home/create");
    })
})
