import pandas as pd
from sqlalchemy import create_engine
import os


df = pd.read_csv("/Users/nguyenvuong/Documents/projects/gscore/src/database/dataset/diem_thi_thpt_2024.csv")


db_url = 'postgresql://root:postgres@localhost:5432/gscore'
engine = create_engine(db_url)

connection = engine.connect()
print("Kết nối thành công!")

student_df = pd.DataFrame()
student_df['registrationNo'] = df['sbd']


#bulk insert data into database
# student_df.to_sql('students', con=engine, if_exists='append', index=False)

subject_df = pd.DataFrame()
subject_df['math_score'] = df['toan']
subject_df['literature_score'] = df['ngu_van']
subject_df['language_score'] = df['ngoai_ngu']
subject_df['physics_score'] = df['vat_li']
subject_df['chemistry_score'] = df['hoa_hoc']
subject_df['biology_score'] = df['sinh_hoc']
subject_df['history_score'] = df['lich_su']
subject_df['geography_score'] = df['dia_li']
subject_df['civic_education_score'] = df['gdcd']
subject_df['language_code'] = df['ma_ngoai_ngu']
subject_df['studentRegistrationNo'] = df['sbd']

subject_df.to_sql('scores', con=engine, if_exists='append', index=False)


print("Bulk insert dữ liệu vào cơ sở dữ liệu thành công!")