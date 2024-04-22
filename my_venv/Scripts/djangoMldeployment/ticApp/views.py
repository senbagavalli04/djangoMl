from django.shortcuts import render
from joblib import load

# Load the machine learning model
model = load('./savedModels/model.joblib')

def convert_to_numeric(move):
    if move == 'X':
        return 1
    elif move == 'O':
        return -1
    else:
        return 0

def predictor(request):
    if request.method == 'POST':
        # Get the moves from the request
        moves = [
            request.POST.get('move1'),
            request.POST.get('move2'),
            request.POST.get('move3'),
            request.POST.get('move4'),
            request.POST.get('move5'),
            request.POST.get('move6'),
            request.POST.get('move7'),
            request.POST.get('move8'),
            request.POST.get('move9')
        ]

        # Convert moves to numerical representations
        numeric_moves = [convert_to_numeric(move) for move in moves]

        # Make predictions using the model
        y_pred = model.predict([numeric_moves])
      

        # Check the prediction to determine the outcome
        if y_pred == 1:
            y_pred = "X wins"
        elif y_pred == 0:
            y_pred = "Draw"
        else:
            y_pred= "O wins"

        # Render the result template
        return render(request, 'main.html' ,{'result' : y_pred})
    return render (request, 'main.html')
