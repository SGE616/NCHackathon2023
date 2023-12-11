'''
    NC Buddy code
'''

class NCbuddy:
    def __init__(self) -> None:
        self.response = ''

    def process_chat_message(self,query) -> str:
        self.query = query
        # print(type(query))
        self.response = 'Sorry, didn\'t quite catch that'
        # print(self.query)
        if self.query == 'Hi' or query == 'Hello':
            self.response = 'Hi NC Buddy here...'
        
        return self.response