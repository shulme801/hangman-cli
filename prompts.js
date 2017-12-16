var questions = [
    {
      type: 'input',
      name: 'artist',
      message: "What Artist Do You Want To Search For?",
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter an artist to search for!';
        }
      }
    }
  ];

  module.exports Questions;