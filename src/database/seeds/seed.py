import pandas as pd
from sqlalchemy import create_engine


df = pd.read_csv("/Users/nguyenvuong/Documents/projects/gscore-backend/src/database/seeds/dataset/diem_thi_thpt_2024.csv")

db_url = 'db_url' # Thay db_url bằng đường dẫn đến cơ sở dữ liệu của bạn
engine = create_engine(db_url)

connection = engine.connect()
print("Kết nối thành công!")

# Batch size
batch_size = 100000

student_df = pd.DataFrame()
student_df['registrationNo'] = df['sbd']


print("Starting bulk insert for students...")
for i in range(0, len(student_df), batch_size):
    batch = student_df.iloc[i:i + batch_size] 
    batch.to_sql('students', con=engine, if_exists='append', index=False)
    print(f"Inserted batch {i // batch_size + 1} successfully.")

print("Bulk insert for students completed!")


def insert_in_chunks(df, table_name, engine, batch_size=100000):
    try:
        for start in range(0, len(df), batch_size):
            end = start + batch_size
            batch_df = df[start:end]  
            batch_df.to_sql(table_name, con=engine, if_exists='append', index=False)
            print(f"Inserted rows {start} to {end}")
    except Exception as e:
        print(f"Lỗi khi thực hiện thao tác cơ sở dữ liệu: {e}")


subject_df = pd.DataFrame({
    'math': df['toan'],
    'literature': df['ngu_van'],
    'language': df['ngoai_ngu'],
    'physics': df['vat_li'],
    'chemistry': df['hoa_hoc'],
    'biology': df['sinh_hoc'],
    'history': df['lich_su'],
    'geography': df['dia_li'],
    'civic_education': df['gdcd'],
    'language_code': df['ma_ngoai_ngu'],
    'studentRegistrationNo': df['sbd']
})

insert_in_chunks(subject_df, 'scores', engine)

print("Bulk insert data into database completed in chunks!")


