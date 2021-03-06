import toastr from 'toastr';
import './Styles/toastr.css';
import 'flatpickr/dist/themes/material_blue.css';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import * as firebase from './Libraries/firebase.library';
import { setFirestore } from 'firestore-eloquent';
import axios from 'axios';

setFirestore(firebase.firestore);

axios.defaults.headers.common['Content-Type'] = 'application/json';

window.toastr = toastr;
window.$ = $;
window.jQuery = $;
