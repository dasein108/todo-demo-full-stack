from datetime import datetime

import pytz


def now_():
    return datetime.now(pytz.utc)
