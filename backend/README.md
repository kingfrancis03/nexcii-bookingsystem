### Run the server

#To install dependencies
```bash
python -m venv venv

pip install -r requirements.txt
```

```bash
source venv/Scripts/activate
```

```bash
uvicorn app.main:app --reload
```
