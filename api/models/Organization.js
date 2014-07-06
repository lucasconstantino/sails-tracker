/**
* Organization.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var S = require('string');

module.exports = {

  attributes: {

    // Used on presentations.
    name: {
      required: true,
      type: 'string'
    },

    // Used on routes and as an ID.
    machineName: {
      required: true,
      type: 'string',
      unique: true,

      /**
       * If no machine name is given, default it to slugified organization name.
       */
      defaultsTo: function () {
        return S(this.name || '').slugify().s || null;
      }
    },

    // References organization's users.
    members: {
      required: true,
      collection: 'user',

      /**
       * Add creator as member.
       */
      defaultsTo: function () {
        return this.createdBy && [this.createdBy] || [];
      }
    },

    // Generic handled attributes.
    createdBy: {
      required: true,
      model: 'user'
    }
  }
};

