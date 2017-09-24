import Exhibit from "./exhibit.jsx";
import {connect} from "react-redux";
import {SubmitNewExhibit, ShowErrorWindow} from "../../App/ac.js";

const S2P = state => ({
    data: state.draft,
    language: state.language,
});
const D2P = dsp => ({
    SubmitNewExhibit: exhibitData=>dsp(SubmitNewExhibit(exhibitData)),
    ShowErrorWindow: error=>dsp(ShowErrorWindow(error))
});

export default connect(S2P,D2P)(Exhibit);