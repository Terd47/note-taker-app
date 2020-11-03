// Dependencies
// =============================================================
const fs = require('fs');
const express = require("express");
const path = require("path");
const util =  require('util');
const logo = require('asciiart-logo');

// Sets up the Express App with port number
// =============================================================
let app = express();
let PORT = 3000;