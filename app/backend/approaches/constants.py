def search_template(x): return f"""Based on conversation history, formulate a search query for the knowledge base.
The knowledge base is full of text, scraped from websites that are related to tampere.
You must formulate the search query, such that it contains similar knowledge that should be in the searchable web page. 
The search query should be relevant to the latest conversation message, such that the next response will be based on relevant knowledge.
You should always weigh the latest message the most, but also take into account the previous messages.
include entities if they are relevant.
Conversation history is delimited with three backticks. 

Conversation history: ```{x}```"""
